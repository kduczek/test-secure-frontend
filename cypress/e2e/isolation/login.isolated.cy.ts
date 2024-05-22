/// <reference types="cypress" />

import { getRandomUser } from "../../generators/userGenerator"
import { usersMocks } from "../../mocks/getAllUsers"
import { loginMocks } from "../../mocks/postSignIn"
import { loginPage } from "../../pages/LoginPageClass"

describe('login page tests in isolation', () => {
  beforeEach(() => {
    cy.visit('')
    cy.get('h2').should('have.text', 'Login')
  })

  it('should successfully login', () => {
    // given
    const user = getRandomUser()
    loginMocks.success(user)
    usersMocks.success()
    cy.percySnapshot('Full login page')

    // when
    loginPage.attemptLogin(user.username, user.password)

    // then
    cy.get('h1').should('contain.text', user.firstName)
  })

})
