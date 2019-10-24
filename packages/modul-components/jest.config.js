
const { jsWithBabel: tsjPreset } = require('ts-jest/presets');


module.exports = {
    testURL: 'http://localhost/',

    roots: [
        '<rootDir>/src/'
    ],
    transform: {
        ...tsjPreset.transform,
        "^.+\\.html(\\?style=\\..+)?$": "<rootDir>/tests/jest/vue-template-transformer.js"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    moduleNameMapper: {
        "^(.+\\.html)(\\?style=\\..+)?$": "$1",
        "\\.(css|less|sass|scss)$": "<rootDir>/tests/jest/jest-ignore.js",
        "\\.min\\.(css|less|sass|scss)|\\.svg$": "<rootDir>/tests/jest/jest-ignore.js"
    },
    snapshotSerializers: [
        "<rootDir>../../node_modules/jest-serializer-vue"
    ],
    setupFiles: [
        "<rootDir>/tests/polyfills.js"
    ],

    coverageDirectory: "<rootDir>/reports/coverage"
};
