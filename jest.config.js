/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  moduleNameMapper: {
    '^astro:actions$': '<rootDir>/__mocks__/astro.ts',
    '^astro:schema$': '<rootDir>/__mocks__/astro.ts',
    '^zod': 'zod',
  },
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  globals: {
    'ts-jest': {
      useESM: true
    }
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx']
};