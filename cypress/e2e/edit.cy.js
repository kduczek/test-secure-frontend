/// <reference types="cypress" />

import { getRandomUser } from "../generators/userGenerator"

describe('Edit page tests', () => {

    let user

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.edit').click()
    })

    afterEach(() => {
        cy.get('@token').then((token) => {
            cy.request({
                method: 'DELETE',
                url: `http://localhost:4001/users/${user.username}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        })
    })

    it('should correctly autocomplete all fields', () => {
        cy.get('[name=firstName]').should('have.value', user.firstName).should('not.have.attr', 'disabled')
        cy.get('[name=lastName]').should('have.value', user.lastName).should('not.have.attr', 'disabled')
        cy.get('[name=email]').should('have.value', user.email).should('not.have.attr', 'disabled')
        cy.get('[name=username]').should('have.value', user.username).should('have.attr', 'disabled')
        cy.get("[name=roles").should('have.value', user.roles.toString()).should('have.attr', 'disabled')
    })

    it('should successfully edit user', () => {
        // given
        const newUser = getRandomUser()

        // when
        cy.get('[name=firstName]').clear().type(newUser.firstName)
        cy.get('[name=lastName]').clear().type(newUser.lastName)
        cy.get('[name=email]').clear().type(newUser.email)
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert-success').should('have.text', 'Updating user successful')
        cy.get('li').contains(`${newUser.firstName} ${newUser.lastName}`).should('exist')
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).should('not.exist')
        cy.url().should('eq', 'http://localhost:8081/')
        // asercja backendowa czyli sprawdzamy ze dane faktycznie sie zapisaly po stronie serwera
        cy.get('@token').then((token) => {
            cy.request({
                method: 'GET',
                url: `http://localhost:4001/users/${user.username}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                expect(response.body.firstName).to.equal(newUser.firstName)
                expect(response.body.lastName).to.equal(newUser.lastName)
                expect(response.body.email).to.equal(newUser.email)

                expect(response.body.roles).to.deep.equal(user.roles)
                expect(response.body.username).to.equal(user.username)
            })
        })
    })

})
