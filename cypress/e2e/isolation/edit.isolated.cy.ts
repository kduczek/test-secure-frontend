/// <reference types="cypress" />

import users from '../../fixtures/users.json'
import { editPage } from '../../pages/editPageObject'
import { homePage } from '../../pages/homePageObject'

describe('home page tests in isolation', () => {
    const userToEdit = users[1]

    beforeEach(() => {
        cy.openHomePage()
        homePage.clickEditOnRowContaining(`${userToEdit.firstName} ${userToEdit.lastName}`)
    })

    it('should correctly autofill user data', () => {
        // @ts-ignore
        editPage.verifyAutocompletion(userToEdit)
    })

})
