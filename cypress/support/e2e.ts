import './commands'
import './isolationCommands'
import 'allure-cypress/commands'
import '@percy/cypress';

beforeEach(() => {
    if (Cypress.env('isMobile')) {
        cy.viewport(393, 852)
    }
})