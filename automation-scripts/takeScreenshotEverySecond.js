import { screenshotsLoop } from '../utils/screenshotsLoop.js';

export async function doIt(contextData, browser, page, log) {
  log('> Taking screenshots every second for all sessions ...');
  await screenshotsLoop(contextData, page, log);
  log('< Screenshots started!');
}
