/// <reference types="cypress" />

describe("API-register", () => {
  it("loads the overview page", { retries: 2 }, () => {
    cy.visit("/");

    cy.get("main").should("be.visible");
    cy.title().should("eq", "Overzicht | API-register");

    cy.get(".results ol li").should("have.length", 10);
    cy.get(".filters #facetfilters input").should("have.length.above", 1);
  });

  it("can navigate to the next page", () => {
    cy.visit("/apis/pagina/1");

    cy.get('[aria-label="Paginering"] a').should("have.length.above", 3);
    cy.get('[rel="next"]').click();

    cy.location("pathname").should("match", /\/pagina\/2/);
    cy.get('[aria-current="true"]')
      .should("have.text", "2")
      .and("have.attr", "aria-label", "Pagina 2: Resultaten 11 tot en met 20");
  });

  it("can filter items", () => {
    cy.visit("/");

    cy.get("#facetfilters input").first().as("firstFilter");
    cy.get("#facetfilters input").last().as("lastFilter");
    cy.get("#get-filters").as("filtersForm");
    cy.get('[aria-label="Huidige filters"] a').should("not.exist");

    cy.get("@firstFilter").scrollIntoView().check();
    cy.get("@filtersForm").submit();

    cy.get("@firstFilter").then((filter) => {
      const name = filter.attr("name");
      const value = filter.val();

      const re = new RegExp(`${name}=${value}`, "g");
      cy.location("search").should("match", re);
    });

    cy.get("@firstFilter").should("be.checked");
    cy.get('[aria-label="Huidige filters"] a').should("have.length", 1);

    cy.get("@lastFilter").scrollIntoView().check();
    cy.get("@filtersForm").submit();

    cy.get('[aria-label="Huidige filters"] a').should("have.length", 3);
  });

  it("loads the toevoegen page", () => {
    cy.visit("/apis/toevoegen");

    cy.get(".basic-content").should("be.visible");
    cy.get('a[href="/apis/key-aanvragen"]').should("have.length.at.least", 1);
  });

  it("loads the key-aanvragen page and form works", () => {
    cy.intercept("POST", "/_actions/keyRequest/", {
      fixture: "keyRequest.json",
    }).as("keyRequest");

    cy.visit("/apis/key-aanvragen");

    cy.get('input[name="email"]').type("test@example.com");
    cy.get('button[type="submit"]').click();

    cy.get("input#api-key").should(
      "have.value",
      "c194e557-7357-a915-517e-1a2b3c4d5e5f",
    );
    cy.get('.utrecht-alert__message[role="status"]').should("be.visible");
  });
});
