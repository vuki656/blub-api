/** @type { import('ts-jest/dist/types').InitialOptionsTsJest } */
module.exports = {
    globalSetup: './setup.ts',
    globalTeardown: './teardown.ts',
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./fileSetup.ts'],
    slowTestThreshold: 15,
    testEnvironment: 'node',
    testMatch: ['**/?*.test.ts'],
    verbose: false,
}
