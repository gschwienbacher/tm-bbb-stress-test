export async function doIt(contextData, browser, page, log) {
  if(contextData.sessionId === 1) {
    log(`> Joining the meeting ${contextData.global.meetingName} as moderator...`);
    let joinAsModeratorUrl = contextData.bbbApi.administration.join('moderator', contextData.global.meetingExternalId, contextData.global.moderatorPW, {redirect: true});
    await page.goto(joinAsModeratorUrl);
    await page.waitForLoadState();
    log(`< Joined meeting - current url: ${await page.url()}`);
  } else {
    log(`Skipping joining the meeting ${contextData.global.meetingName} as moderator.`);
  }
}
  