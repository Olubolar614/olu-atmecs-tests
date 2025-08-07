import { World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, APIRequestContext } from '@playwright/test';

export class CustomWorld extends World {
  context?: BrowserContext;
  page?: Page;
  browser?: Browser;
  apiContext?: APIRequestContext;
  response?: any;

  constructor(options: IWorldOptions) {
    super(options);
    // Set the default timeout to 60 seconds
    this.parameters.timeout = 60000;
  }
}