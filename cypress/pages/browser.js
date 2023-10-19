class Browser {
  static expect() {
    return {
      toBeMyAccountDashboard: () => cy.url().should('include', '/my-account'),
    };
  }

  static visitPage(pageName) {
    cy.visit(`/${pageName}`);
  }

  static visitStory(component) {
    cy.visit('/iframe.html?id=' + component + '&viewMode=story');
    cy.url().should('include', component);
    cy.injectAxe();
  }
}

export default Browser;
