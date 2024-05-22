import { User } from "../types/user";

export const homePage = {

    selectors: {
        editLink: '.edit',
        rowSelector: 'li'
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
    }

}