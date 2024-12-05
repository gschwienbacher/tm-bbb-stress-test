import { selectors as s } from '../utils/elements.js';

export async function doIt(contextData, browser, page, log) {
  log('> Muting microphone ...');
  await page.click(s.muteMicrophoneButton);
  log('< Microphone muted!');
}