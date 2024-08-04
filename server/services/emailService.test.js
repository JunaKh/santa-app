const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { addPendingRequest, _clearPendingRequests, _sendPendingRequestsEmail } = require('./emailService');

jest.mock('nodemailer');
jest.mock('googleapis', () => {
    const actualGoogleApis = jest.requireActual('googleapis');
    const mockOAuth2Client = {
        setCredentials: jest.fn(),
        getAccessToken: jest.fn().mockResolvedValue({ token: 'mock-access-token' })
    };
    return {
        ...actualGoogleApis,
        google: {
            ...actualGoogleApis.google,
            auth: {
                ...actualGoogleApis.google.auth,
                OAuth2: jest.fn(() => mockOAuth2Client)
            }
        }
    };
});

describe('Email Service', () => {
    let sendMailMock;

    beforeAll(() => {
        sendMailMock = jest.fn();
        nodemailer.createTransport.mockReturnValue({
            sendMail: sendMailMock
        });
    });

    afterEach(() => {
        sendMailMock.mockClear();
        _clearPendingRequests();
    });

    it('should add pending request and call sendMail', async () => {
        const request = {
            userid: 'charlie.brown',
            wish: 'A new bike',
            address: '219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo'
        };

        addPendingRequest(request);

        // Явно вызвать функцию отправки писем
        await _sendPendingRequestsEmail();

        expect(sendMailMock).toHaveBeenCalled();
        const mailOptions = sendMailMock.mock.calls[0][0];
        expect(mailOptions.to).toBe('santa@northpole.com');
        expect(mailOptions.subject).toBe('Pending Christmas Requests');
        expect(mailOptions.text).toContain('charlie.brown');
        expect(mailOptions.text).toContain('219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo');
        expect(mailOptions.text).toContain('A new bike');
    });
});
