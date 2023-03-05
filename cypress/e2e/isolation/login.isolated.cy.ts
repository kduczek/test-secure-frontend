/// <reference types="cypress" />

import { getRandomUser } from "../../domain/user"
import { getUsersMocks } from "../../mocks/getUsersMocks"
import { postUserSignin } from "../../mocks/postUserSignin"
import LoginPage from "../../pages/LoginPage"
import failedLoginBody from "../../fixtures/failedLogin.json"

describe('Login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
        const user = getRandomUser()
        postUserSignin.mockSuccess(user)
        getUsersMocks.mockUsers()

        // when
        LoginPage.attemptLogin(user.username, user.password)

        // then
        cy.get('h1').should('contain.text', user.firstName)
        cy.wait('@loginRequest').its('request.body').should('deep.equal', {
            password: user.password,
            username: user.username
        })
    })

    it('should fail to login', () => {
        // given
        postUserSignin.mockFailure()

        // when
        LoginPage.attemptLogin('wrong', 'wrong')

        // then
        cy.get('.alert-danger').should('have.text', failedLoginBody.message)
    })

})
