export async function doIt(contextData, browser, page, log) {
    if(contextData.sessionId === 1) {
        log('> Creating meeting...');
        const meetingExternalId = 'meeting-' + (new Date()).getTime();
        const meetingName = 'Meeting 1';
        const attendeePW = 'at';
        const moderatorPW = 'md';
        const meetingCreateUrl = contextData.bbbApi.administration.create(meetingName, meetingExternalId, {attendeePW, moderatorPW });
        const result = await contextData.http(meetingCreateUrl);
        if(result.returncode === 'SUCCESS') {
            log('< Meeting created!');
            Object.assign(contextData.global, { meetingExternalId, meetingName, attendeePW, moderatorPW });
        } else {
            log('< Failure creating meeting');
        }
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
}
  