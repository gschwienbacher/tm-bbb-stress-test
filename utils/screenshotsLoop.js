export async function screenshotsLoop(contextData, page, log) {
  let count = 0;
  const interval = setInterval(async () => {
    if (page.isClosed()) {
      clearInterval(interval);
      return log('Page is closed, stopping screenshots.');
    }
    count++;
    await page.screenshot({ path: `screenshots/${count}-${contextData.scriptName}-session${contextData.sessionId}.png` });
  }, 1000);
}
