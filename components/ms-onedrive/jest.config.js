module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^ms-utils$": "<rootDir>/../../packages/ms-utils/src/index.ts",
  },
};
