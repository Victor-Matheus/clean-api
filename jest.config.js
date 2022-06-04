module.exports = {
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1'
  },
  roots: [
    '<rootDir>/tests',
    '<rootDir>/src'
  ],
  transform: {
    '\\.ts$': 'ts-jest'
  }
}
