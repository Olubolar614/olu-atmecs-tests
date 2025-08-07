import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  timeout: 60000,
  globalTimeout: 600000,
  expect: { timeout: 10000 },
  use: {
    actionTimeout: 10000,
    navigationTimeout: 30000,
    video: "on", // instead of 'retain-on-failure'
    screenshot: "only-on-failure", // optional
  },
};

export default config;
