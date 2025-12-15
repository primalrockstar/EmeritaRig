describe('Flashcards Feature', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('[data-cy=email]').type('test@example.com')
    cy.get('[data-cy=password]').type('testpass')
    cy.get('[data-cy=login-button]').click()
    cy.url().should('include', '/dashboard')
  })

  it('should display flashcards section', () => {
    cy.get('[data-cy=flashcards-link]').click()
    cy.url().should('include', '/flashcards')

    cy.get('[data-cy=flashcard-deck]').should('be.visible')
  })

  it('should flip flashcard', () => {
    cy.get('[data-cy=flashcards-link]').click()

    // Check front of card
    cy.get('[data-cy=flashcard-front]').should('be.visible')
    cy.get('[data-cy=flashcard-back]').should('not.be.visible')

    // Flip card
    cy.get('[data-cy=flip-card]').click()

    // Check back of card
    cy.get('[data-cy=flashcard-front]').should('not.be.visible')
    cy.get('[data-cy=flashcard-back]').should('be.visible')
  })

  it('should navigate between flashcards', () => {
    cy.get('[data-cy=flashcards-link]').click()

    // Next card
    cy.get('[data-cy=next-card]').click()
    cy.get('[data-cy=flashcard-front]').should('contain', 'Question 2')

    // Previous card
    cy.get('[data-cy=prev-card]').click()
    cy.get('[data-cy=flashcard-front]').should('contain', 'Question 1')
  })

  it('should filter flashcards by category', () => {
    cy.get('[data-cy=flashcards-link]').click()

    cy.get('[data-cy=category-filter]').select('Cardiology')
    cy.get('[data-cy=flashcard-deck]').should('contain', 'Cardiology')
  })

  it('should track flashcard progress', () => {
    cy.get('[data-cy=flashcards-link]').click()

    // Mark as known
    cy.get('[data-cy=mark-known]').click()

    // Check progress indicator
    cy.get('[data-cy=progress-bar]').should('be.visible')
    cy.get('[data-cy=known-count]').should('contain', '1')
  })

  it('should show spaced repetition schedule', () => {
    cy.get('[data-cy=flashcards-link]').click()

    cy.get('[data-cy=review-schedule]').should('be.visible')
    cy.get('[data-cy=due-today]').should('be.visible')
  })
})