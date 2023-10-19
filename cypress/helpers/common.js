import { When } from 'cypress-cucumber-preprocessor/steps';

When(`I am at date {int} / {int} / {int}`, (day, month, year) => {
  const now = new Date(day, month, year).getTime();
  cy.clock(now);
});
