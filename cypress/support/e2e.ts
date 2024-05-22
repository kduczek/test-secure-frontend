import './commands'
import './isolationCommands'
import 'allure-cypress/commands'

beforeEach(() => {
    if (Cypress.env('isMobile')) {
        cy.viewport(393, 852)
    }
})