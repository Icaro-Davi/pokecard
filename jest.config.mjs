import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    dir: './'
});

/** @type {import('jest').Config} */
const customJestConfig = {
    moduleDirectories: ["<rootDir>/node_modules/", "<rootDir>/"],
    testEnvironment: "jest-environment-jsdom",
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
    testMatch: ['<rootDir>/src/**/__tests__/**/*.test.(js|ts|tsx)'],
}

export default createJestConfig(customJestConfig);