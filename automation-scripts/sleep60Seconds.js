export async function doIt(contextData, browser, page, log) {
  log('Sleeping for 60 seconds...');
  await new Promise(resolve => setTimeout(resolve, 60*1000));
  log('Woke up!');
}
