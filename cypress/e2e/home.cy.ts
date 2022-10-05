/// <reference types="cypress" />

import { getRandomUser, User } from "../domain/user"

describe('Home page tests', () => {
    let user: User

    beforeEach(() => {
        user = getRandomUser()
        cy.request({
            method: 'POST',
            url: 'http://localhost:4001/users/signup',
            body: user
        }).then((resp) => expect(resp.status).to.eq(201))

        cy.login(user.username, user.password)
        cy.visit('')
        cy.getCookie('token').its('value').should('not.be.empty')
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', '/login')
    })

    it('should open add more users page', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', '/add-user')
    })

})
