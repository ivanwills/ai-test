import '@cypress/code-coverage/support';
import './commands';
import 'cypress-axe';

const resizeObserverLoopErrRe = /ResizeObserver loop limit exceeded/;

Cypress.on('uncaught:exception', (err) => {
  if (resizeObserverLoopErrRe.test(err.message)) {
    return false;
  }
});
