module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],  // hoặc chỉ 'src' nếu tests ở trong src
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
};