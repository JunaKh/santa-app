const { getUsers, getUserProfiles, validateUserData } = require('./dataService');
const axios = require('axios');

jest.mock('axios');

describe('dataService', () => {
    describe('getUsers', () => {
        it('should fetch users', async () => {
            const users = [
                { username: 'charlie.brown', uid: '730b0412-72c7-11e9-a923-1681be663d3e' },
                { username: 'james.bond', uid: '730b06a6-72c7-11e9-a923-1681be663d3e' }
            ];
            axios.get.mockResolvedValue({ data: users });

            const result = await getUsers();
            expect(result).toEqual(users);
        });
    });

    describe('getUserProfiles', () => {
        it('should fetch user profiles', async () => {
            const profiles = [
                { userUid: '730b0412-72c7-11e9-a923-1681be663d3e', birthdate: '2017/12/05' },
                { userUid: '730b06a6-72c7-11e9-a923-1681be663d3e', birthdate: '1987/01/01' }
            ];
            axios.get.mockResolvedValue({ data: profiles });

            const result = await getUserProfiles();
            expect(result).toEqual(profiles);
        });
    });

    describe('validateUserData', () => {
        it('should validate user data correctly', async () => {
            const users = [
                { username: 'charlie.brown', uid: '730b0412-72c7-11e9-a923-1681be663d3e' }
            ];
            const profiles = [
                { userUid: '730b0412-72c7-11e9-a923-1681be663d3e', birthdate: '2017/12/05', address: '219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo' }
            ];
            axios.get.mockResolvedValueOnce({ data: users });
            axios.get.mockResolvedValueOnce({ data: profiles });

            const result = await validateUserData('charlie.brown');
            expect(result).toEqual({
                isValid: true,
                user: {
                    username: 'charlie.brown',
                    uid: '730b0412-72c7-11e9-a923-1681be663d3e',
                    address: '219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo'
                },
                profile: {
                    userUid: '730b0412-72c7-11e9-a923-1681be663d3e',
                    birthdate: '2017/12/05',
                    address: '219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo'
                }
            });
        });

        it('should return an error if user is not found', async () => {
            axios.get.mockResolvedValueOnce({ data: [] });

            const result = await validateUserData('unknown.user');
            expect(result).toEqual({ isValid: false, error: 'User not found' });
        });

        it('should return an error if user profile is not found', async () => {
            const users = [
                { username: 'charlie.brown', uid: '730b0412-72c7-11e9-a923-1681be663d3e' }
            ];
            axios.get.mockResolvedValueOnce({ data: users });
            axios.get.mockResolvedValueOnce({ data: [] });

            const result = await validateUserData('charlie.brown');
            expect(result).toEqual({ isValid: false, error: 'User profile not found' });
        });

        it('should return an error if birthdate is invalid', async () => {
            const users = [
                { username: 'charlie.brown', uid: '730b0412-72c7-11e9-a923-1681be663d3e' }
            ];
            const profiles = [
                { userUid: '730b0412-72c7-11e9-a923-1681be663d3e', birthdate: 'invalid-date' }
            ];
            axios.get.mockResolvedValueOnce({ data: users });
            axios.get.mockResolvedValueOnce({ data: profiles });

            const result = await validateUserData('charlie.brown');
            expect(result).toEqual({ isValid: false, error: 'Invalid birthdate format' });
        });

        it('should return an error if user is too old', async () => {
            const users = [
                { username: 'charlie.brown', uid: '730b0412-72c7-11e9-a923-1681be663d3e' }
            ];
            const profiles = [
                { userUid: '730b0412-72c7-11e9-a923-1681be663d3e', birthdate: '2000/01/01' }
            ];
            axios.get.mockResolvedValueOnce({ data: users });
            axios.get.mockResolvedValueOnce({ data: profiles });

            const result = await validateUserData('charlie.brown');
            expect(result).toEqual({ isValid: false, error: 'User is too old for this event' });
        });
    });
});