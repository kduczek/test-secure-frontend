import { getRandomUser, getRandomUserWithFirstName } from "../generators/userGenerator"
import { usersMocks } from "../mocks/getAllUsers"

Cypress.Commands.add('openHomePage', () => {
    const user = getRandomUserWithFirstName('Isolated')
    const { password, ...rest } = user
    const fakeResponseObject = {
        ...rest,
        token: 'fakeToken'
    }
    localStorage.setItem('user', JSON.stringify(fakeResponseObject))
    cy.setCookie('token', 'fakeToken')
    usersMocks.success()
    cy.visit('')
})