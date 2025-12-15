describe('Quiz and Assessment Flow', () => {
  beforeEach(() => {
    // Login before each test
    cy.visit('/login')
    cy.get('[data-cy=email]').type('test@example.com')
    cy.get('[data-cy=password]').type('testpass')
    cy.get('[data-cy=login-button]').click()
    cy.url().should('include', '/dashboard')
  })

  it('should start a quiz', () => {
    cy.get('[data-cy=start-quiz-button]').click()
    cy.url().should('include', '/quiz')

    // Should show first question
    cy.get('[data-cy=question-text]').should('be.visible')
    cy.get('[data-cy=answer-options]').should('be.visible')
  })

  it('should answer questions and track progress', () => {
    cy.get('[data-cy=start-quiz-button]').click()

    // Answer first question
    cy.get('[data-cy=answer-option]').first().click()
    cy.get('[data-cy=submit-answer]').click()

    // Should show explanation
    cy.get('[data-cy=answer-explanation]').should('be.visible')

    // Continue to next question
    cy.get('[data-cy=next-question]').click()
    cy.get('[data-cy=question-text]').should('be.visible')
  })

  it('should complete quiz and show results', () => {
    cy.get('[data-cy=start-quiz-button]').click()

    // Answer questions until completion
    for (let i = 0; i < 10; i++) {
      cy.get('[data-cy=answer-option]').first().click()
      cy.get('[data-cy=submit-answer]').click()
      cy.get('[data-cy=next-question]').click()
    }

    // Should show results
    cy.get('[data-cy=quiz-results]').should('be.visible')
    cy.get('[data-cy=score-percentage]').should('be.visible')
  })

  it('should navigate between quiz sections', () => {
    cy.get('[data-cy=quiz-sections]').within(() => {
      cy.get('[data-cy=cardiology-section]').click()
      cy.url().should('include', '/quiz/cardiology')
    })

    cy.get('[data-cy=back-to-sections]').click()
    cy.get('[data-cy=quiz-sections]').should('be.visible')
  })

  it('should save quiz progress', () => {
    cy.get('[data-cy=start-quiz-button]').click()

    // Answer a few questions
    cy.get('[data-cy=answer-option]').first().click()
    cy.get('[data-cy=submit-answer]').click()
    cy.get('[data-cy=next-question]').click()

    // Navigate away and come back
    cy.get('[data-cy=dashboard-link]').click()
    cy.get('[data-cy=resume-quiz]').click()

    // Should resume from where left off
    cy.get('[data-cy=question-text]').should('be.visible')
  })
})