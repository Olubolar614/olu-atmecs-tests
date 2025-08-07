import { APIRequestContext } from '@playwright/test';

export class BaseApi {
  readonly apiContext: APIRequestContext;

  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
  }

  protected async get(endpoint: string) {
    return this.apiContext.get(endpoint);
  }

  protected async post(endpoint: string, data: object) {
    return this.apiContext.post(endpoint, { data });
  }
}