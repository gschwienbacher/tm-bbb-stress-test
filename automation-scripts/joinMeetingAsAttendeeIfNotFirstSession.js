export async function doIt(contextData, browser, page, log) {
  if(contextData.sessionId !== 1) {
    log(`> Joining the meeting ${contextData.meetingName} as attendee...`);
    let joinAsAttendeeUrl = contextData.bbbApi.administration.join(`attendee-${contextData.sessionId}`, contextData.meetingExternalId, contextData.moderatorPW, {redirect: true});
    await page.goto(joinAsAttendeeUrl);
    await page.waitForLoadState();
    log(`< Joined meeting - current url: ${await page.url()}`);
  } else {
    log(`Skipping joining the meeting ${contextData.meetingName} as attendee.`);
  }
}
  