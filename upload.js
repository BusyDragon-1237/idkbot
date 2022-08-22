/* 
Google Drive API:
Demonstration to:
1. upload 
2. delete 
3. create public URL of a file.
required npm package: googleapis
*/
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '119890551944-lfe995pc91s6h0hhcmmtg8pajn76mho1.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '4/0AdQt8qgoqOJy5h9zpcfHi_H_Q1-1xGQbZyP1fdy4f7jNgw4LQO28XZCehWbjigoll0i2Ww';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

/* 
filepath which needs to be uploaded
Note: Assumes example.jpg file is in root directory, 
though this can be any filePath
*/
const filePath = path.join(__dirname, 'INA.XD.12.1.r17-182208-olives.REL.zip.json', 'INA.XD.12.1.r17-182208-olives.REL.zip');

async function uploadFile() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: 'INA.XD.12.1.r17-182208-olives.REL.zip', //This can be name of your choice
        mimeType: 'application/zip',
      },
      media: {
        mimeType: 'application/zip',
        body: fs.createReadStream(filePath),
      },
      requestBody: {
        name: 'INA.XD.12.1.r17-182208-olives.REL.zip.json', //This can be name of your choice
        mimeType: 'application/json',
      },
      media: {
        mimeType: 'application/json',
        body: fs.createReadStream(filePath),
      },  
    });

    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
}

// uploadFile();

async function deleteFile() {
  try {
    const response = await drive.files.delete({
      fileId: '11Kp74mtCmSw8n6uE6VDGHBEjaPL64ORZ',
    });
    console.log(response.data, response.status);
  } catch (error) {
    console.log(error.message);
  }
}

// deleteFile();

async function generatePublicUrl() {
  try {
    const fileId = '11Kp74mtCmSw8n6uE6VDGHBEjaPL64ORZ';
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    /* 
    webViewLink: View the file in browser
    webContentLink: Direct download link 
    */
    const result = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink, webContentLink',
    });
    console.log(result.data);
  } catch (error) {
    console.log(error.message);
  }
}

// generatePublicUrl();
