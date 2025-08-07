import { Before, After, setWorldConstructor, Status } from "@cucumber/cucumber";
import { chromium, request } from "@playwright/test";
import { CustomWorld } from "../support/world";
import { config } from "../support/config";
import fs from "fs";

setWorldConstructor(CustomWorld);

Before({ tags: "@ui" }, async function (this: CustomWorld) {
  const headlessMode = process.env.HEADLESS === 'true' || false;
  
  // Clear previous videos
  const videoDir = "test-results/videos/";
  if (fs.existsSync(videoDir)) {
    fs.rmSync(videoDir, { recursive: true, force: true });
  }

  this.browser = await chromium.launch({
    headless: headlessMode,
    slowMo: headlessMode ? 0 : 500,
  });
  
  this.context = await this.browser.newContext({
    recordVideo: {
      dir: videoDir,
    },
  });
  
  this.page = await this.context.newPage();
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

    await page.close();
    await context?.close(); // Finalizes video
    
    // Universal delay for all OS
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  // Attach video if exists
  if (videoPath && fs.existsSync(videoPath) && fs.statSync(videoPath).size > 0) {
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
