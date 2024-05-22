/// <reference types="cypress" />

import { alertComponent } from "../../components/alert"
import { getRandomUser } from "../../generators/userGenerator"
import { signUpMocks } from "../../mocks/postSignUp"
import { registerPage } from "../../pages/registerPageObject"

describe('register page tests in isolation', () => {
    beforeEach(() => {
        cy.visit('/register')
        cy.get('h2').should('have.text', 'Register')
    })

    it('should successfully register', () => {
        // given
        const user = getRandomUser()
        signUpMocks.success()

        // when
        registerPage.attemptRegister(user)

        // then
        alertComponent.verifySuccess('Registration successful')
    })

    it('should fail to login if user already exists', () => {
         // given
         const user = getRandomUser()
         const errorMessage = "Username is already in use"
         signUpMocks.usernameExists(errorMessage)
 
         // when
         registerPage.attemptRegister(user)
 
         // then
         alertComponent.verifyFailure(errorMessage)
    })

})
