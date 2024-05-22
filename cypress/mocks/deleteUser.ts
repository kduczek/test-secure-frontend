export const deleteUserMocks = {

    deleteUser: (userName: string) => {
        cy.intercept('DELETE', `**/users/${userName}`, (req) => {
            req.reply({
                statusCode: 204
            })
        })
    }
}