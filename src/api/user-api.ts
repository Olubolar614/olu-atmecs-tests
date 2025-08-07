import { APIRequestContext } from '@playwright/test';
import { BaseApi } from './base-api';

export class UserApi extends BaseApi {
  constructor(apiContext: APIRequestContext) {
    super(apiContext);
  }

  async createUser(payload: object) {
    // JSONPlaceholder uses /posts endpoint for creating resources
    return this.post('/posts', payload);
  }
}