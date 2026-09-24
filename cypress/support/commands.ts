declare namespace Cypress {
  interface Chainable<Subject> {
    metatag(name: string): Chainable<JQuery<HTMLElement>>;
    metatag(name: string): Chainable<Subject>;
    og(name: string): Chainable<JQuery<HTMLMetaElement>>;
    og(name: string): Chainable<Subject>;
  }
}

Cypress.Commands.add("metatag", (name: string) => {
  return cy.get(`head > meta[name="${name}"]`);
});

Cypress.Commands.add("og", (name: string) => {
  return cy.get(`head > meta[property="og:${name}"]`);
});
