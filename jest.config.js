module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    modulePathIgnorePatterns: [
        '<rootDir>/build/',
    ],
    moduleDirectories: ['node_modules', 'src'],
};
