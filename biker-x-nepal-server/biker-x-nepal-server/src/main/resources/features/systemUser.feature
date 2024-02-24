Feature: SystemUser
  Scenario Outline: Fetching User Scenario
    Given getAll SystemUser
    And getById SystemUser
#    Then can Login to System

    Examples:
    | userId | email | firstName | lastName | password | role |
    | 1 | asis.mool@gmail.com | Ashish | Mool | $2a$10$h8d7WrgMnIlmK8TxYHxTeuYk0DLs0EAgp5y/ZJrFgjOhFFbxnu6qW | Customer |

  Scenario Outline: Register User Scenario
    Given save SystemUser
    And Verify Id
    Then Verify Email


    Examples:
      | email | firstName | lastName | password
      | asis.mool@gmail.com | Ashish | Mool | Test@123

