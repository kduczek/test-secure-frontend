/// <reference types="cypress" />

import users from '../../fixtures/users.json'

describe('home page tests in isolation', () => {
    beforeEach(() => {
        cy.openHomePage()
    })

    it('should correctly display all users', () => {
        // then
        cy.get('li').should('have.length', users.length)
        cy.get('li').each(($row, i) => {
            expect($row).to.contain.text(`${users[i].firstName} ${users[i].lastName}`)
        })
    })

})
