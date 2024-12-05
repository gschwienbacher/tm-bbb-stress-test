import { selectors as s } from '../utils/elements.js';

export async function doIt(contextData, browser, page, log) {
  log('> Joining audio with microphone ...');
  await page.waitForSelector(s.audioModal);
  await page.click(s.microphoneButton);
  await page.click(s.joinEchoTestButton);
  await page.waitForSelector(s.audioDropdownMenuButton);
  log('< Audio joined!');
}
