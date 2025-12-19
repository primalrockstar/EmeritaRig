// cypress/support/commands.js

// Custom commands can be added here
// For more comprehensive examples of custom commands please read more here:
// https://on.cypress.io/custom-commands

Cypress.Commands.add('login', (email, password) => {
  cy.session([email, password], () => {
    cy.visit('/login')
    cy.get('[data-cy=email]').type(email)
    cy.get('[data-cy=password]').type(password)
    cy.get('[data-cy=submit-login]').click()
    cy.url().should('not.include', '/login')
  })
})