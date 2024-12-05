import { selectors as s } from '../utils/elements.js';

export async function doIt(contextData, browser, page, log) {
  log('> Joining audio listen only ...');
  await page.waitForSelector(s.audioModal);
  await page.click(s.listenOnlyButton);
  await page.waitForSelector(s.audioDropdownMenuButton);
  log('< Audio joined!');
}
