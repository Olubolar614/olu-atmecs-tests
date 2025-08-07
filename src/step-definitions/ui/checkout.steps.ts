import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world";
import { CheckoutPage } from "../../pages/checkout.page";
import { config } from "../../support/config";

Given(
  "I am on Sauce Labs login page",
  { timeout: 60000 },
  async function (this: CustomWorld) {
    const checkout = new CheckoutPage(this.page!);
    await checkout.navigateTo(`${config.baseUrl}`);
  }
);

When(
  "I login with {string} and {string}",
  { timeout: 60000 },
  async function (this: CustomWorld, username: string, password: string) {
    const checkout = new CheckoutPage(this.page!);
    await checkout.login(username, password);
  }
);
When(
  "I add the product {string} to the cart",
  { timeout: 60000 },
  async function (this: CustomWorld, productName: string) {
    const checkout = new CheckoutPage(this.page!);
    await checkout.clickProductByNameandAddtocart(productName);
  }
);
When(
  "I fill in the checkout information with {string},{string},{string} and complete the checkout process",
  { timeout: 60000 },
  async function (
    this: CustomWorld,
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    const checkout = new CheckoutPage(this.page!);
    await checkout.proceedToCheckout(firstName, lastName, postalCode);
  }
);
Then(
  "I should see {string} and logout successful",
  { timeout: 60000 },
  async function (this: CustomWorld, successmessage: string) {
    const checkout = new CheckoutPage(this.page!);
    await checkout.verifySuccessmessage(successmessage);
  }
);
Then(
  "I should see Epic sadface: Sorry, this user has been locked out.",
  { timeout: 60000 },
  async function (this: CustomWorld) {
    const checkout = new CheckoutPage(this.page!);
    await checkout.verifyLockedOutUser();
  }
);
