
# bbb-stress-test 

## Overview

This tool allows stress testing of a BBBB server by running automation scripts in a browserless environment.

## Requirements 
 
- [Docker](https://www.docker.com/)  (only required for the server running Browserless)
 
- [Node.js](https://nodejs.org/)  (v16 or newer)
 
- [npm](https://www.npmjs.com/)
 
- [Playwright](https://playwright.dev/)

## Setup 

### 1. Start the Browserless Server 

The Browserless server can run either locally or on a remote machine. Use Docker to set up the server.

#### Localhost Setup: 

If you want to run the Browserless server locally, execute the following command:


```bash
docker run -d -p 3000:3000 --rm --name bbb_stress_test_browserless ghcr.io/browserless/multi
```

#### Remote Server Setup: 

If you prefer to run the Browserless server on a remote machine:

1. Install Docker on the remote machine.

2. Run the above Docker command on the remote machine.

3. Note the public or private IP address of the remote server and ensure port 3000 is accessible.

### 2. Install Dependencies on the Client 
On the machine running the `bbb-stress-test` client, install the required Node.js dependencies and Playwright:

```bash
npm install
npx playwright install --with-deps
```

### 3. Prepare Automation Scripts 
Ensure your automation scripts are compatible with the expected format. Each script should export a `doIt` function, like this:

```javascript
export async function doIt(contextData, browser, page, log) {
  log("Executing automation script...");
  // Your automation logic here
}
```

### 4. Run the Application 

Use the following command to run the stress test:


```bash
./stress-test.js --bbbbServerUrl <URL> --bbbServerSecret <SECRET> --automationScripts <SCRIPTS> [--concurrent <SESSIONS>]
```

#### Options: 
 
- `--bbbbServerUrl`: The URL of the BBBB server (required).
 
- `--bbbServerSecret`: The secret key for the BBB server (required).
 
- `--automationScripts`: A comma-separated list of paths to your automation scripts (required).
 
- `--concurrent`: The number of concurrent sessions to run (optional, defaults to 1).

#### Specifying the Browserless Server: 
The code assumes the Browserless server is running at `ws://localhost:3000/chromium/playwright`. If the server is running on a remote machine, you need to update the connection URL in the code to point to the remote server's WebSocket URL (e.g., `ws://<REMOTE_IP>:3000/chromium/playwright`).
### Example: 


```bash
node index.js \
  --bbbbServerUrl "https://example.com" \
  --bbbServerSecret "mySecretKey" \
  --automationScripts "./scripts/createMeeting.js,./scripts/joinMeeting.js" \
  --concurrent 5
```
