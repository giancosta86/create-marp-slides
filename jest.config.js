module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"]
  },

  modulePathIgnorePatterns: [
    "<rootDir>/src/archetype/",
    "<rootDir>/dist/archetype/"
  ],

  testPathIgnorePatterns: ["<rootDir>/dist/", "/_.+"],

  setupFilesAfterEnv: ["jest-extended/all"]
};
