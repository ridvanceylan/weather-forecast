module.exports = {
    setupFilesAfterEnv: [
      '@testing-library/jest-dom', 
    ],
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['<rootDir>/jest.setup.js'],

  };