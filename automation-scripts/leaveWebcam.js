import { selectors as s } from '../utils/elements.js';

export async function doIt(contextData, browser, page, log) {
  log('> Leaving webcam ...');
  await page.click(s.leaveVideoButton);
  await page.waitForSelector(s.joinVideoButton);
  log('< Webcam stopped sharing!');
}