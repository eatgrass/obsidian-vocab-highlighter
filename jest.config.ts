import type { Config } from 'jest'

const config: Config = {
    verbose: true,
    preset: 'ts-jest',
    transform: {
        '.ts': [
            'ts-jest',
            {
                tsconfig: './tsconfig.jest.json',
            },
        ],
    },
    moduleFileExtensions: ['js', 'ts'],
    testTimeout: 1000,
}

module.exports = config
