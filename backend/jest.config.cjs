module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json',
      useESM: true,
    }],
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@muzammil/foundation(.*)$': '<rootDir>/../../../packages/foundation/src$1',
    '^@muzammil/core(.*)$': '<rootDir>/../../../packages/core/src$1',
    '^@muzammil/contracts-education(.*)$': '<rootDir>/../../../packages/contracts/education/src$1',
    '^@muzammil/ui(.*)$': '<rootDir>/../../../packages/ui/src$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
