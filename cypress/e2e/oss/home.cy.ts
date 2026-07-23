/// <reference types="cypress" />

describe("oss register", () => {
  it("loads the home page", { retries: 2 }, () => {
    cy.visit("/");

    cy.get("main").should("be.visible");
    cy.title().should("eq", "Overzicht | Open Source Register");

    cy.get(".results ol li").should("have.length", 20);
    cy.get(".filters #facetfilters input").should("have.length.above", 1);
  });

  it("can navigate to the next page", () => {
    cy.visit("/repositories/pagina/1");

    cy.get('[aria-label="Paginering"] a').should("have.length.above", 3);
    cy.get('[rel="next"]').click();

    cy.location("pathname").should("match", /\/pagina\/2/);
    cy.get('[aria-current="true"]')
      .should("have.text", "2")
      .and("have.attr", "aria-label", "Pagina 2: Resultaten 21 tot en met 40");
  });

  it.only("can filter items", () => {
    cy.visit("/");

    cy.get("#facetfilters input").first().as("firstFilter");
    cy.get("#facetfilters input").last().as("lastFilter");
    cy.get("#get-filters").as("filtersForm");
    cy.get('[aria-label="Huidige filters"] a').should("have.length", 1);

    cy.get("@firstFilter").scrollIntoView().focus().press("ArrowRight");
    cy.get("@filtersForm").submit();

    cy.get("@firstFilter").then((filter) => {
      const name = filter.attr("name");
      cy.get(`input[name="${name}"]:checked`).then((inputChecked) => {
        const value = inputChecked.val();

        const re = new RegExp(`${name}=${value}`, "g");
        cy.location("search").should("match", re);
      });
    });

    cy.get('[aria-label="Huidige filters"] a').should("have.length", 1);

    cy.get("@lastFilter").scrollIntoView().check();
    cy.get("@filtersForm").submit();

    cy.get('[aria-label="Huidige filters"] a').should("have.length", 3);
  });

  it("loads the toevoegen page", () => {
    cy.visit("/repositories/toevoegen");

    cy.get(".basic-content").should("be.visible");
    cy.get(
      'a[href="https://apis.developer.overheid.nl/apis/key-aanvragen"]',
    ).should("have.length.at.least", 1);
  });
});
