import nextJest from "next/jest";
import path from "path";

const nextDir = "./";
const customJestConfig = {
  collectCoverage: true,
  coverageProvider: "v8",
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!<rootDir>/out/**",
    "!<rootDir>/.next/**",
    "!<rootDir>/*.config.js",
    "!<rootDir>/coverage/**",
  ],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/prismicio$": path.resolve(__dirname, "./src/prismicio"),
    "^@/(.*)$": path.resolve(__dirname, "./src/$1"),
    "^@/components/(.*)$": "<rootDir>/components/$1",
  },
};

const createJestConfig = nextJest({ dir: nextDir });

export default createJestConfig(customJestConfig);
