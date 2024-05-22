/// <reference types="cypress" />

import users from '../../fixtures/users.json'
import { deleteUserMocks } from '../../mocks/deleteUser'
import { homePage } from '../../pages/homePageObject'

describe('home page tests in isolation', () => {
    beforeEach(() => {
        cy.openHomePage()
        cy.get('li').should('have.length', users.length)
    })

    it('should correctly display all users', () => {
        // then
        cy.get('li').each(($row, i) => {
            expect($row).to.contain.text(`${users[i].firstName} ${users[i].lastName}`)
        })
        cy.percySnapshot('Full home page')
    })

    it('should correctly delete an users', () => {
        //given
        const userToDelete = users[1]
        deleteUserMocks.deleteUser(userToDelete.username);
        const userToDeleteName = `${userToDelete.firstName} ${userToDelete.lastName}`

        //when
        homePage.clickDeleteOnRowContaining(userToDeleteName)
        // then
        cy.get('li').contains(userToDeleteName).should('not.exist')
        cy.get('li').should('have.length', users.length - 1)
    })

    it('should not delete an users if confirmation cancelled', () => {
        //given
        const userToDelete = users[1]
        deleteUserMocks.deleteUser(userToDelete.username);
        const userToDeleteName = `${userToDelete.firstName} ${userToDelete.lastName}`
        Cypress.on('window:confirm', (confirmationText) => {
            expect(confirmationText).to.eq('Are you sure you wish to delete this item?')
            return false
        })

        //when
        homePage.clickDeleteOnRowContaining(userToDeleteName)
        // then
        cy.get('li').contains(userToDeleteName).should('exist')
        cy.get('li').should('have.length', users.length)
    })
})
