@ui @allure.label.owner:TestUser @allure.label.severity:critical @WebInterface @checkoutFlow
Feature: UI Tests

  Scenario: Verify that user can successfully checkout the product
    Given I am on Sauce Labs login page
    When I login with "standard_user" and "secret_sauce"
    When I add the product "Sauce Labs Backpack" to the cart
    When I fill in the checkout information with "John","Doe","90001" and complete the checkout process
    Then I should see "THANK YOU FOR YOUR ORDER" and logout successful

  Scenario: Verify that user has been locked out
    Given I am on Sauce Labs login page
    When I login with "locked_out_user" and "secret_sauce"
    Then I should see Epic sadface: Sorry, this user has been locked out.
