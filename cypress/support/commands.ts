import { getRandomUser } from "../domain/user"

Cypress.Commands.add('login', (username, password) => {
    // 1. Mam wysłać request na /users/signin z poprawnymi danymi logowania
    // 2. Oczekuję odpowiedzi http 200 bo to znaczy ze logowanie się udało
    // 3. Chcę ustawić odpowiedź w localStorage
    // 4. Chcę ustawić token z odpowiedzi w ciastku o nazwie token

    // 1.
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signin',
        body: { username, password }
    }).then((resp) => {
        // 2.
        expect(resp.status).to.eq(200)
        // 3.
        localStorage.setItem('user', JSON.stringify(resp.body))
        // 4. Ciastko musimy ustawić w then() po wykonaniu tej funkcji
        return resp.body.token
    })
})

Cypress.Commands.add('register', (user) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signup',
        body: user
    }).then((resp) => expect(resp.status).to.eq(201))
})

Cypress.Commands.add('deleteUser', (username, token) => {
    cy.request({
        method: 'DELETE',
        url: `http://localhost:4001/users/${username}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((resp) => expect(resp.status).to.eq(204))
})

Cypress.Commands.add('visitHomePageAsLoggedInUser', () => {
    const user = getRandomUser()
    const fakeToken = 'fakeToken'
    const fakeLocalStorageEntry = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: user.roles,
        token: fakeToken
    }
    localStorage.setItem('user', JSON.stringify(fakeLocalStorageEntry))
    cy.setCookie('token', fakeToken)
    cy.intercept('GET', '**/users', { fixture: 'users.json' })
    cy.visit('')
})
