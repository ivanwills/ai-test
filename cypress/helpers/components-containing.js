import { Then } from 'cypress-cucumber-preprocessor/steps';

const HAVE_LENGTH = 'have.length';

Then(`I should see the component {string} {int} times`, (name, times) => {
  cy.get(`[data-component=${name}]`).should(HAVE_LENGTH, times);
});

Then(`the component {string} should contain text {string}`, (name, text) => {
  cy.get(`[data-component=${name}]`).contains(text);
});

Then(
  `the component {string} {int} st/nd/rd/th selector {string} should contain {string}`,
  (name, occurrence, selector, text) => {
    cy.get(`[data-component=${name}] ${selector}`)
      .eq(occurrence - 1)
      .should('have.text', text);
  }
);

Then(
  `the component {string} testid {string} should contain {string}`,
  (name, selector, text) => {
    cy.get(`[data-component=${name}] [data-testid=${selector}]`)
      .eq(0)
      .should('have.text', text);
  }
);

Then(
  `the component {string} should have tag {string} {int} times`,
  (name, tag, times) => {
    cy.get(`[data-component=${name}] ${tag}`).should(HAVE_LENGTH, times);
  }
);

Then(
  `the component {string} should have the {int} st/nd/rd/th tag {string} with text {string}`,
  (name, occurrence, tag, text) => {
    cy.get(`[data-component=${name}] ${tag}`)
      .eq(occurrence - 1)
      .should('have.text', text);
  }
);

Then(
  `the component {string} should contain selector {string} {int} times`,
  (name, selector, number) => {
    cy.get(`[data-component=${name}] ${selector}`).should(HAVE_LENGTH, number);
  }
);

Then(
  `the component {string} should have the {int} st/nd/rd/th tag {string} that has the {int} st/nd/th sibling contain text {string}`,
  (name, occurrence, tag, sibling, text) => {
    cy.get(`[data-component=${name}] ${tag}`)
      .eq(occurrence - 1)
      .siblings()
      .eq(sibling - 1)
      .contains(text);
  }
);
