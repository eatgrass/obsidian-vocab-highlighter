// import type { } from 'ts-jest'
import type {Config} from 'jest';

const config: Config = {
    verbose: true,
    preset: 'ts-jest',
    transform: {
        '.ts': [
            'ts-jest',
            {
                // Note: We shouldn't need to include `isolatedModules` here because it's a deprecated config option in TS 5,
                // but setting it to `true` fixes the `ESM syntax is not allowed in a CommonJS module when
                // 'verbatimModuleSyntax' is enabled` error that we're seeing when running our Jest tests.
                tsconfig: './tsconfig.jest.json',
            },
        ],
    },
    // transform: {
    //     '^.+\\.svelte$': [
    //         'svelte-jester',
    //         {
    //             preprocess: true,
    //         },
    //     ],
    //     '^.+\\.ts$': 'ts-jest',
    // },
    moduleFileExtensions: ['js', 'ts'],
    testTimeout: 1000,

    // A list of paths to modules that run some code to configure or
    // set up the testing framework before each test.
    // setupFilesAfterEnv: ['<rootDir>/tests/CustomMatchers/jest.custom_matchers.setup.ts'],
    // globalSetup: "./tests/global-setup.js"
}

module.exports = config
