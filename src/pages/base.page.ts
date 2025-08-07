import { Page } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path, {
      waitUntil: 'domcontentloaded',
      timeout: 25000
    });
    await this.page.waitForLoadState('networkidle', { timeout: 15000 });
  }
}