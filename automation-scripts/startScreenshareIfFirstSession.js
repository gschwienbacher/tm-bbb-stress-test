import { selectors as s } from '../utils/elements.js';

export async function doIt(contextData, browser, page, log) {
  if (contextData.sessionId === 1) {
    log(`> Starting screenshare on meeting ${contextData.global.meetingName}...`);
    await page.click(s.startScreenSharing);
    await page.waitForSelector(s.stopScreenSharing);
    log(`< Screenshare started!`);
  }
}
