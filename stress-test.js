#!/usr/bin/env node
import pw from "playwright-core";
import { getTimestamp } from './utils/date-time.js';
import { Command } from 'commander';
import bbb from 'bigbluebutton-js';

function log() {
  console.log(`${getTimestamp()} -`, ...arguments);
}

const program = new Command();

program
  .name('node-app')
  .description('A Node.js application to process bbbServerUrl, bbbServerSecret, and automationScripts')
  .version('1.0.0')
  .requiredOption('-u, --bbbServerUrl <url>', 'URL of the BBB server')
  .requiredOption('-s, --bbbServerSecret <secret>', 'Secret key for the BBB server')
  .requiredOption('-a, --automationScripts <scripts>', 'Comma-separated list of paths to automation scripts')
  .option('-c, --concurrent <sessions>', 'Number of concurrent sessions to run', parseInt)
  .action(async (options) => {

    // Function to mask sensitive info
    const maskString = (str, visibleStart = 0, visibleEnd = 0) => {
      if (!str || typeof str !== "string") return "";
      const maskedPart = "*".repeat(Math.max(0, str.length - visibleStart - visibleEnd));
      return str.slice(0, visibleStart) + maskedPart + str.slice(-visibleEnd);
    };

    console.log('==================================================================');
    console.log('Processing with the following parameters:');
    console.log(`BBB Server URL: ${options.bbbServerUrl}`);
    console.log(`BBB Server Secret: ${maskString(options.bbbServerSecret, 3, 3)}`);
    console.log(`Automation Scripts: ${options.automationScripts}`);
    console.log(`Concurrent Sessions: ${options.concurrent || 1}`);
    console.log('==================================================================');


    const scriptPaths = options.automationScripts.split(',');

    const globalContextData = {};

    const executeScripts = async (sessionId) => {
      log(`[Session ${sessionId}]`, `> Connecting to browserless`);
      const browser = await pw.chromium.connect('ws://localhost:3000/chromium/playwright');
      log(`[Session ${sessionId}]`, `< Connected!`);

      const context = await browser.newContext({
        viewport: {
          width: 1920,
          height: 1080,
        },
        recordVideo: {
          dir: '/tmp/',
          size: { width: 1920, height: 1080 },
        }  
      });

      context.setDefaultTimeout(3*60*1000); // 3 minutes
      
      const page = await context.newPage();

      log(`[Session ${sessionId}]`, `> Running automation scripts`);
      const contextData = {
        sessionId,
        global: globalContextData,
        bbbApi:  bbb.api(options.bbbServerUrl, options.bbbServerSecret),
        http:    bbb.http
      };
      for (const scriptPath of scriptPaths) {
        try {
          const automationScript = await import(scriptPath.trim());
          if (typeof automationScript.doIt !== 'function') {
            throw new Error("The automation script does not export a function named 'doIt'");
          }

          await automationScript.doIt(contextData, browser, page, function () {
            log(`[Session ${sessionId}]`, `${scriptPath}: `, ...arguments);
          });
        } catch (error) {
          console.error(`[Session ${sessionId}]`, `Failed to execute automation script (${scriptPath}): ${error.message}`);
        }
      }

      log(`[Session ${sessionId}]`, `> Closing page`);
      await page.close();
      log(`[Session ${sessionId}]`, `< Page closed`);

      log(`[Session ${sessionId}]`, `> Saving video`);
      const video =  page.video();
      await video.saveAs(`/tmp/videos/session-${sessionId}.webm`);
      log(`[Session ${sessionId}]`, `< Saved video`);
      
      log(`[Session ${sessionId}]`, `> Closing browser`);
      await browser.close();
      log(`[Session ${sessionId}]`, `< Browser closed`);
    };

    const sessionPromises = [];
    const numberOfSessions = options.concurrent || 1;

    for (let i = 1; i <= numberOfSessions; i++) {
      sessionPromises.push(executeScripts(i));
    }

    // Run all sessions concurrently
    await Promise.all(sessionPromises);
    log("> All sessions completed");
    
    process.exit(0);
  });

program.parse(process.argv);
