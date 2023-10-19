import { And } from 'cypress-cucumber-preprocessor/steps';

And(`It has no detectable a11y violations on load`, () => {
  cy.configureAxe({
    reporter: 'v2',
    rules: [
      { id: 'landmark-one-main', enabled: false },
      { id: 'region', enabled: false },
      { id: 'page-has-heading-one', enabled: false },
    ],
  });
  cy.checkA11y();
});
