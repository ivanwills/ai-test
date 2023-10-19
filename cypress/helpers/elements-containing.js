import { And, Then } from 'cypress-cucumber-preprocessor/steps';

const BE_VISIBLE = 'be.visible';

const HAVE_LENGTH = 'have.length';
const RADIO_BUTTON_SELECTOR = 'input[type=radio]';

Then(`I have a {string} text called {string}`, (headerType, headerText) => {
  cy.get(headerType)
    .should(BE_VISIBLE)
    .then(($header) => {
      expect($header).to.contain(headerText);
    });
});

And(`I have an anchor with text called {string}`, (anchorText) => {
  cy.get('a')
    .should(BE_VISIBLE)
    .then(($anchor) => {
      expect($anchor).to.contain(anchorText);
      expect($anchor).to.have.attr('role', 'link');
    });
});

And(`I have a {string} button with text {string}`, (buttonType, buttonText) => {
  cy.get(`button[type=${buttonType}]`)
    .should(BE_VISIBLE)
    .then(($button) => {
      const selectedButtonText = $button[0].innerText;
      expect(selectedButtonText).to.be.equal(buttonText);
    });
});

Then(`I should see text {string} in {string}`, (text, selector) => {
  cy.get(selector).should('have.text', text);
});

Then(`I should see {int} radio buttons`, (length) => {
  cy.get(RADIO_BUTTON_SELECTOR).should(HAVE_LENGTH, length);
});

Then(
  `I should see the {int} st/nd/rd/th radio button {string}`,
  (occurrence, attr) => {
    cy.get(RADIO_BUTTON_SELECTOR)
      .eq(occurrence - 1)
      .should('have.attr', attr);
  }
);

Then(
  `I should see the {int} st/nd/rd/th button with {string}`,
  (occurrence, text) => {
    cy.get('button')
      .eq(occurrence - 1)
      .should('have.text', text);
  }
);

Then(`I should see the tag {string} {int} times`, (name, times) => {
  cy.get(`${name}`).should(HAVE_LENGTH, times);
});

Then(`the tag {string} should equal text {string}`, (name, text) => {
  cy.get(`${name}`).contains(text);
});

Then(`the text {string} should exist {int} time/times`, (text, length) => {
  cy.findAllByText(text).should(HAVE_LENGTH, length);
});
