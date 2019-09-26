
const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
    testURL: 'http://localhost/',

    transform: {
        ...tsjPreset.transform,
        "^.+\\.html(\\?style=\\..+)?$": "<rootDir>/tests/jest/vue-template-transformer.js"
    },
    roots: [
        '<rootDir>/src/'
    ],
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
        "\\.min\\.(css|less|sass|scss)|\\.svg$": "<rootDir>/tests/jest/jest-ignore.js",
        "@ulaval/modul-components/dist/(.*)": "<rootDir>/../../packages/modul-components/src/$1",
        "@ulaval/modul-website/src/(.*)": "<rootDir>/../modul-website/src/$1"
    },
    snapshotSerializers: [
        "<rootDir>../../node_modules/jest-serializer-vue"
    ],
    setupFiles: [
        "<rootDir>/tests/polyfills.js"
    ],
    coverageDirectory: "<rootDir>/reports/coverage"
};
