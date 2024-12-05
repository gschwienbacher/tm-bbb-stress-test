export async function doIt(contextData, browser, page, log) {
  if(contextData.sessionId === 1) {
    log(`> Join URLs:`);
    let joinAsModeratorUrl = contextData.bbbApi.administration.join('moderator', contextData.global.meetingExternalId, contextData.global.moderatorPW, {redirect: true});
    let joinAsAttendeeUrl = contextData.bbbApi.administration.join('attendee', contextData.global.meetingExternalId, contextData.global.attendeePW, {redirect: true});

    log(`Join URL's:
    - moderator: ${joinAsModeratorUrl}
    - attendee: ${joinAsAttendeeUrl}
    `);
  }
}
