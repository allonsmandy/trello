describe('Trello', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
  });

  it('Adds columns', () => {
    cy.get('.board__newColumn').within(() => {
      cy.get('input').should('have.attr', 'placeholder', '+ Enter new column');
    });
    cy.get('.board__newColumn > input').type('To Do {enter}');
    cy.get('.board__newColumn > input').type('In progress {enter}');
    cy.get('.board__newColumn > input').type('Done {enter}');
  });

  it('Adds tasks in the "To Do" column', () => {
    cy.get(':nth-child(1) > .column > .column__new-column').type('Write the new chapter of my book {enter}');
    cy.get(':nth-child(1) > .column > .column__new-column').type('Watch new netflix movie {enter}');
    cy.get(':nth-child(1) > .column > .column__new-column').type('Study javascript with unit tests {enter}');
  });

  it('Adds tasks in the "In Progress" column and edit description', () => {
    cy.get(':nth-child(2) > .column > .column__new-column').type('Finish testing with cypress {enter}');
    cy.get(':nth-child(2) > .column > .task > :nth-child(1) > :nth-child(1) > div > .task__title').click();
    cy.get('.empty-description')
      .clear()
      .type("It's from my trello app in Vue.js!");

    cy.get('.task-view__close').click();
  });

  it('Remove task and column', () => {
    cy.get(':nth-child(3) > .task__delete').click();
    cy.get(':nth-child(2) > .column > .column__wrapper > .column__delete').click();
  });
});
