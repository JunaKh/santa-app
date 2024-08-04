module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js'],
    testMatch: ['**/*.test.js'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
};
