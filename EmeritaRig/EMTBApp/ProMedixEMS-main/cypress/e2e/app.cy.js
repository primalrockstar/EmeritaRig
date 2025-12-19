describe('EMT-B App E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the app successfully', () => {
    cy.contains('EMT-B').should('be.visible')
  })

  it('should navigate to dashboard', () => {
    cy.get('[data-cy=dashboard-link]').click()
    cy.url().should('include', '/dashboard')
  })

  it('should perform login flow', () => {
    cy.get('[data-cy=login-button]').click()
    cy.get('[data-cy=email]').type('test@example.com')
    cy.get('[data-cy=password]').type('password')
    cy.get('[data-cy=submit-login]').click()
    cy.contains('Welcome').should('be.visible')
  })
})