/// <reference types="cypress" />

describe("oss register", () => {
  it("loads the home page", () => {
    cy.visit("/");

    cy.get("main").should("be.visible");
    cy.title().should("not.be.empty");
  });
});
