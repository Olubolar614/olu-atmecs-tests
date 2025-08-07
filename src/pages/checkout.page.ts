import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class CheckoutPage extends BasePage {
  private readonly usernameInput = this.page.locator("#user-name");
  private readonly passwordInput = this.page.locator("#password");
  private readonly submitButton = this.page.locator("#login-button");
  private readonly addToCartButton = this.page.locator(
    'button:has-text("ADD TO CART")'
  );
  private readonly cartIcon = this.page.locator("#shopping_cart_container");
  private readonly checkoutButton = this.page.locator(
    '.btn_action:has-text("CHECKOUT")'
  );
  private readonly firstNameInput = this.page.locator("#first-name");
  private readonly lastNameInput = this.page.locator("#last-name");
  private readonly postalCodeInput = this.page.locator("#postal-code");
  private readonly continueButton = this.page.locator(
    'input[type="submit"][value="CONTINUE"]'
  );
  private readonly FinishButton = this.page.locator('//a[text()="FINISH"]');
  private readonly menuButton = this.page.locator(".bm-burger-button");
  private readonly logoutLink = this.page.locator("#logout_sidebar_link");
  private readonly errorMessage = this.page.locator('[data-test="error"]');

  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.waitFor({ state: "visible", timeout: 15000 });
    await this.usernameInput.fill(username);

    await this.passwordInput.waitFor({ state: "visible", timeout: 15000 });
    await this.passwordInput.fill(password);

    await this.submitButton.waitFor({ state: "visible", timeout: 15000 });
    await this.submitButton.click();
    await this.page.waitForLoadState("networkidle", { timeout: 10000 });
  }
  async clickProductByNameandAddtocart(productName: string): Promise<void> {
    const productLocator = this.page.locator(
      `.inventory_item_name:has-text("${productName}")`
    );
    await productLocator.waitFor({ state: "visible", timeout: 10000 });
    await productLocator.click();
    await this.addToCartButton.waitFor({ state: "visible", timeout: 10000 });
    await this.addToCartButton.click();
  }
  async proceedToCheckout(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.cartIcon.waitFor({ state: "visible", timeout: 5000 });
    await this.cartIcon.click();
    await this.checkoutButton.waitFor({ state: "visible", timeout: 5000 });
    await this.checkoutButton.click();
    await this.firstNameInput.waitFor({ state: "visible", timeout: 5000 });
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.waitFor({ state: "visible", timeout: 5000 });
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.waitFor({ state: "visible", timeout: 5000 });
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.waitFor({ state: "visible", timeout: 5000 });
    await this.continueButton.click();
    await this.FinishButton.waitFor({ state: "visible", timeout: 5000 });
    await this.FinishButton.click();
  }
  verifySuccessmessage = async (successMessage: string): Promise<void> => {
    const successMessageLocator = this.page.locator(
      `.complete-header:has-text("${successMessage}")`
    );
    await successMessageLocator.waitFor({ state: "visible", timeout: 10000 });
    const isVisible = await successMessageLocator.isVisible();
    if (!isVisible) {
      throw new Error(`Success message "${successMessage}" not found`);
    }
    await this.menuButton.waitFor({ state: "visible", timeout: 5000 });
    await this.menuButton.click();
    await this.logoutLink.waitFor({ state: "visible", timeout: 5000 });
    await this.logoutLink.click();
    await this.submitButton.waitFor({ state: "visible", timeout: 5000 });

    const isVisibleloginbutton = await this.submitButton.isVisible();
    if (!isVisibleloginbutton) {
      throw new Error("Logout failed, login button not visible");
    }
  };
  async verifyLockedOutUser(): Promise<void> {
    await this.errorMessage.waitFor({ state: "visible", timeout: 5000 });
    const errorText = await this.errorMessage.textContent();
    if (!errorText?.includes("Sorry, this user has been locked out.")) {
      throw new Error(
        `Expected locked out error message not found. Actual message: "${errorText}"`
      );
    }
    console.log("✅ User is locked out and proper error message is displayed.");
  }
}
