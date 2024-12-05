import { screenshotsLoop } from '../utils/screenshotsLoop.js';

export async function doIt(contextData, browser, page, log) {
  if (contextData.sessionId === 1) {
    log('> Taking screenshots every second for first session...');
    await screenshotsLoop(contextData, page, log);
    log('< Screenshots started!');
  }
}
