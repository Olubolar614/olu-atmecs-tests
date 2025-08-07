import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../support/world';
import { UserApi } from '../../api/user-api';

When('I create user with name {string} and job {string}', 
  async function (this: CustomWorld, name: string, job: string) {
    const userApi = new UserApi(this.apiContext!);
    this.response = await userApi.createUser({ 
      title: `${name}'s Post`,
      body: job,
      userId: 1
    });
    
    console.log('Request URL:', this.response.url());
    console.log('Status Code:', this.response.status());
    console.log('Response Body:', await this.response.json());
  }
);

Then('response status should be {int}', 
  async function (this: CustomWorld, status: number) {
    const actualStatus = this.response!.status();
    
    if (actualStatus !== status) {
      const responseBody = await this.response!.json();
      throw new Error(
        `Expected status ${status} but got ${actualStatus}. Response: ${JSON.stringify(responseBody)}`
      );
    }
    
    expect(actualStatus).toBe(status);
  }
);