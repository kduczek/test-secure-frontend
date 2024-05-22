import { User } from "../types/user";

export const homePage = {

    selectors: {
        editLink: '.edit',
        rowSelector: 'li',
        deleteLink: '.delete'
    },

    clickEditOnUser: (user: User) => {
        cy.get(homePage.selectors.rowSelector)
            .contains(`${user.firstName} ${user.lastName}`)
            .find(homePage.selectors.editLink)
            .click()
    },

    clickEditOnRowContaining: (name: string) => {
        cy.get(homePage.selectors.rowSelector)
            .contains(name)
            .find(homePage.selectors.editLink)
            .click()
    },

    clickDeleteOnRowContaining: (name: string) => {
        cy.get(homePage.selectors.rowSelector)
            .contains(name)
            .find(homePage.selectors.deleteLink)
            .click()
    }
}