import { When } from 'cypress-cucumber-preprocessor/steps';

When(`click the button with the text {string}`, async (buttonText) => {
  cy.findByText(buttonText).click().as('buttonClick');
});

When(`I click on the {int} st/nd/rd/th button`, (occurrence) => {
  cy.get('button')
    .eq(occurrence - 1)
    .click();
});

When(`I click on the {int} st/nd/rd/th radio button`, (occurrence) => {
  cy.get('.radio-stacked-group label')
    .eq(occurrence - 1)
    .click();
});
