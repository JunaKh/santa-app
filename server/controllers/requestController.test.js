const request = require('supertest');
const { app, startServer } = require('../server');
const { addPendingRequest } = require('../services/emailService');
const { validateUserData } = require('../services/dataService');

jest.mock('../services/emailService');
jest.mock('../services/dataService');

describe('Request Controller', () => {
    let server;

    beforeAll(() => {
        server = startServer(5001);
    });

    afterAll(() => {
        server.close();
    });

    beforeEach(() => {
        validateUserData.mockClear();
        addPendingRequest.mockClear();
    });

    it('should return 400 if userid or wish is missing', async () => {
        const response = await request(app).post('/api/submit').send({});
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Both user ID and wish are required.");
    });

    it('should return 400 if wish exceeds 100 character limit', async () => {
        const response = await request(app).post('/api/submit').send({
            userid: 'charlie.brown',
            wish: 'a'.repeat(101)
        });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Wish exceeds 100 character limit.");
    });

    it('should return 400 if validation fails', async () => {
        validateUserData.mockResolvedValue({ isValid: false, error: 'User not found' });
        const response = await request(app).post('/api/submit').send({
            userid: 'unknown.user',
            wish: 'A new bike'
        });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('User not found');
    });

    it('should return 200 if validation succeeds', async () => {
        validateUserData.mockResolvedValue({
            isValid: true,
            user: { address: '219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo' }
        });
        const response = await request(app).post('/api/submit').send({
            userid: 'charlie.brown',
            wish: 'A new bike'
        });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Wish submitted successfully for 219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo!');
        expect(addPendingRequest).toHaveBeenCalledWith({
            userid: 'charlie.brown',
            wish: 'A new bike',
            address: '219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo'
        });
    });
});
