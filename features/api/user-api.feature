@api @allure.label.owner:TestUser
@allure.label.severity:critical @ApiPostRequest 
Feature: API Tests
  Scenario: Create valid user
    When I create user with name "John" and job "Engineer"
    Then response status should be 201