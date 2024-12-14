export default {
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy", // Mock CSS modules
  },
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest", // Use Babel to transform JS/TS files
  },
  testEnvironment: "jsdom", // Simulate a browser-like environment
};
