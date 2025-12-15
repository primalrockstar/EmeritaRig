describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should register a new user', () => {
    // Navigate to registration
    cy.get('[data-cy=register-link]').click()
    cy.url().should('include', '/register')

    // Fill registration form
    cy.get('[data-cy=email]').type('newuser@example.com')
    cy.get('[data-cy=password]').type('testpass123')
    cy.get('[data-cy=confirm-password]').type('testpass123')
    cy.get('[data-cy=accept-terms]').check()
    cy.get('[data-cy=register-button]').click()

    // Should redirect to dashboard
    cy.url().should('include', '/dashboard')
    cy.contains('Welcome').should('be.visible')
  })

  it('should login existing user', () => {
    // Navigate to login
    cy.get('[data-cy=login-link]').click()
    cy.url().should('include', '/login')

    // Fill login form
    cy.get('[data-cy=email]').type('test@example.com')
    cy.get('[data-cy=password]').type('testpass')
    cy.get('[data-cy=login-button]').click()

    // Should redirect to dashboard
    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')
  })

  it('should show error for invalid credentials', () => {
    cy.get('[data-cy=login-link]').click()
    cy.get('[data-cy=email]').type('invalid@example.com')
    cy.get('[data-cy=password]').type('wrongpass')
    cy.get('[data-cy=login-button]').click()

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('should logout successfully', () => {
    // Login first
    cy.get('[data-cy=login-link]').click()
    cy.get('[data-cy=email]').type('test@example.com')
    cy.get('[data-cy=password]').type('testpass')
    cy.get('[data-cy=login-button]').click()

    // Logout
    cy.get('[data-cy=user-menu]').click()
    cy.get('[data-cy=logout-button]').click()

    // Should redirect to home
    cy.url().should('not.include', '/dashboard')
    cy.get('[data-cy=login-link]').should('be.visible')
  })
})