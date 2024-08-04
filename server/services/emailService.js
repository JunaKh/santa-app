const nodemailer = require('nodemailer');
const { google } = require('googleapis');

let pendingRequests = [];

const oAuth2Client = new google.auth.OAuth2(
    'YOUR_CLIENT_ID',
    'YOUR_CLIENT_SECRET',
    'https://developers.google.com/oauthplayground'
);


oAuth2Client.setCredentials({
    refresh_token: 'YOUR_REFRESH_TOKEN' // yours refresh_token
});

async function sendMail(mailOptions) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'your-email@gmail.com',
                clientId: 'YOUR_CLIENT_ID',
                clientSecret: 'YOUR_CLIENT_SECRET',
                refreshToken: 'YOUR_REFRESH_TOKEN',
                accessToken: accessToken.token,
            },
        });

        const result = await transporter.sendMail(mailOptions);
        return result;
    } catch (error) {
        console.error('Error sending email:', error);
        return error;
    }
}

function addPendingRequest(request) {
    console.log('Adding pending request:', request);
    pendingRequests.push(request);
}

async function _sendPendingRequestsEmail() {
    if (pendingRequests.length === 0) {
        console.log('No pending requests to send.');
        return;
    }

    console.log('Sending pending requests email...');
    const mailOptions = {
        from: 'do_not_reply@northpole.com',
        to: 'santa@northpole.com',
        subject: 'Pending Christmas Requests',
        text: pendingRequests.map(request => (
            `Child username: ${request.userid}\nChild's address: ${request.address}\nRequest: ${request.wish}\n\n`
        )).join('')
    };

    try {
        const result = await sendMail(mailOptions);
        console.log('Email sent:', result);
        pendingRequests = []; // Clear the pending requests after sending
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

function _clearPendingRequests() {
    pendingRequests = [];
}

// Set up interval to send email every 15 seconds
setInterval(_sendPendingRequestsEmail, 15000);

module.exports = { addPendingRequest, _clearPendingRequests, _sendPendingRequestsEmail };
