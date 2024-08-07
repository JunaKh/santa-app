import nodemailer from 'nodemailer';
import { google } from 'googleapis';

interface PendingRequest {
  userid: string;
  wish: string;
  address: string;
}

let pendingRequests: PendingRequest[] = [];

export function addPendingRequest(request: PendingRequest): void {
  pendingRequests.push(request);
}

export function _clearPendingRequests(): void {
  pendingRequests = [];
}

export async function _sendPendingRequestsEmail(): Promise<void> {
  const oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
  );

  oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'do_not_reply@northpole.com',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token || '',
      },
    });

    const mailOptions = {
      from: 'do_not_reply@northpole.com',
      to: 'santa@northpole.com',
      subject: 'Pending Christmas Requests',
      text: pendingRequests
          .map((req) => `${req.userid}: ${req.wish} (${req.address})`)
          .join('\n'),
    };

    await transport.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
