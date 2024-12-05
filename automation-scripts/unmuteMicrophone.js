import { selectors as s } from '../utils/elements.js';

export async function doIt(contextData, browser, page, log) {
  log('> Unmuting microphone ...');
  await page.click(s.unmuteMicButton);
  await page.waitForSelector(s.muteMicrophoneButton);
  log('< Microphone unmuted!');
}
