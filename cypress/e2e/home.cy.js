/// <reference types="cypress" />

import { getRandomUser } from "../util/user"

describe('Home page', () => {
    let user
    let token

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.visit('http://localhost:8081')
        cy.getCookie('token').then((cookie) => token = cookie.value)
    })

    afterEach(() => {
        // usunięcie uzytkownika uzytkownika
        cy.request({
            method: 'DELETE',
            url: `http://localhost:4001/users/${user.username}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((resp) => {
            expect(resp.status).to.eq(204)
        })
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.gte', 1)
    })

    it('should open edit page', () => {
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.edit').click()
    })

    it('should open add more users page', () => {
        cy.get('#addmore').click();
        cy.url().should('contain', '/add-user');
    });

    it('should log out', () => {

        cy.get('#logout').click();
        cy.url().should('contain', '/login');
    });

})