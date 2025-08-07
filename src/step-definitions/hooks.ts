import { Before, After, setWorldConstructor, Status } from "@cucumber/cucumber";
import { chromium, request } from "@playwright/test";
import { CustomWorld } from "../support/world";
import { config } from "../support/config";
import fs from "fs";

setWorldConstructor(CustomWorld);

Before({ tags: "@ui" }, async function (this: CustomWorld) {
  const headlessMode = process.env.HEADLESS === 'true' || false;
  this.browser = await chromium.launch({
    headless: headlessMode,  // <-- Used here
    slowMo: headlessMode ? 0 : 500, // Add slow motion to see what's happening
  });
  this.context = await this.browser.newContext({
    recordVideo: {
      dir: "test-results/videos/",
    },
  });
  this.page = await this.context.newPage();

  // Set Playwright timeouts
  await this.page.setDefaultNavigationTimeout(30000);
  await this.page.setDefaultTimeout(20000);
});

Before({ tags: "@api" }, async function (this: CustomWorld) {
  this.apiContext = await request.newContext({
    baseURL: config.apiUrl,
    timeout: 20000,
  });
});

After(async function (this: CustomWorld, scenario) {
  const page = this.page;
  const context = this.context;
  const browser = this.browser;

  let videoPath: string | undefined;

  if (page) {
    // Capture video path BEFORE closing
    videoPath = await page.video()?.path();

    // Attach screenshot if failed
    if (scenario.result?.status === Status.FAILED) {
      const screenshot = await page.screenshot();
      this.attach(screenshot, "image/png");
    }

    await page.close(); // must close page first
    await context?.close(); // this finalizes the video
  }

  // Now safely read and attach the video
  if (videoPath && fs.existsSync(videoPath)) {
    const videoBuffer = fs.readFileSync(videoPath);
    this.attach(videoBuffer, "video/webm");
  }

  await browser?.close();
  await this.apiContext?.dispose?.();
});
After({ tags: "@api" }, async function (scenario) {
  if (scenario.result?.status === Status.FAILED && this.apiResponse) {
    const responseBody = await this.apiResponse.text();
    this.attach(`API Response: ${responseBody}`, "text/plain");
  }
});
