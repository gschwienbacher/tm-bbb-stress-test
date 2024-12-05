import { selectors as s } from '../utils/elements.js';

export async function doIt(contextData, browser, page, log) {
  log('> Joining webcam ...');
  await page.click(s.joinVideoButton);
  await page.click(s.startSharingWebcamButton);
  await page.waitForSelector(s.leaveVideoButton);
  log('< Webcam joined!');
}