const { calculateAge } = require('./calculateAge');

describe('calculateAge', () => {
    it('should calculate the correct age', () => {
        const birthdate = new Date('2010-01-01');
        const age = calculateAge(birthdate);
        expect(age).toBe(new Date().getFullYear() - 2010);
    });

    it('should handle leap years correctly', () => {
        const birthdate = new Date('2000-02-29');
        const age = calculateAge(birthdate);
        expect(age).toBe(new Date().getFullYear() - 2000);
    });
});
