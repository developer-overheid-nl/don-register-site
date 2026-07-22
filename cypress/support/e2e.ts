// Shared Cypress e2e support can be registered here.

beforeEach(() => {
  cy.intercept("https://statistiek.rijksoverheid.nl/ppms.*", { log: false }).as(
    "piwikPing",
  );
});
