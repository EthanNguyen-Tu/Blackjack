/* eslint-disable @typescript-eslint/no-require-imports */
const { createDefaultPreset, pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
    testEnvironment: "jsdom",
    transform: {
        ...tsJestTransformCfg,
    },
    moduleNameMapper: {
        "\\.module\\.css$": "identity-obj-proxy",
        ...pathsToModuleNameMapper(compilerOptions.paths, {
            prefix: "<rootDir>/",
        }),
    },
};
