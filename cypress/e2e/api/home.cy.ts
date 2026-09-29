/// <reference types="cypress" />

describe("API-register", () => {
  it("loads the overview page", { retries: 2 }, () => {
    cy.visit("/");

    cy.get("main").should("be.visible");

    // head tags
    cy.title().should("eq", "Overzicht | API-register - developer.overheid.nl");
    cy.og("title").should("have.attr", "content", "Overzicht");
    cy.og("site_name").should(
      "have.attr",
      "content",
      "API-register - developer.overheid.nl",
    );
    cy.metatag("description").should(
      "have.attr",
      "content",
      "Welkom bij het API-Register. Hier vind je informatie over de API's die beschikbaar zijn voor gebruik binnen de overheid.",
    );
    cy.og("description").should(
      "have.attr",
      "content",
      "Welkom bij het API-Register. Hier vind je informatie over de API's die beschikbaar zijn voor gebruik binnen de overheid.",
    );
    cy.og("image")
      .invoke("attr", "content")
      .should("include", "/don-api-register-social-card.png");
    cy.og("image:alt").should(
      "have.attr",
      "content",
      "API-register: Hier vind je informatie over de API's die beschikbaar zijn voor gebruik binnen de overheid.",
    );
    cy.og("type").should("have.attr", "content", "website");
    cy.og("locale").should("have.attr", "content", "nl_NL");

    // content
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

  it("can sort APIs and preserve the query context", () => {
    cy.viewport(1440, 900);
    cy.visit("/apis/pagina/2?q=api&sortBy=title&sortOrder=asc");

    cy.get(".results-toolbar").should(($toolbar) => {
      const styles = getComputedStyle($toolbar[0] as HTMLElement);

      expect(styles.display).to.equal("grid");
      expect(styles.gridTemplateColumns.split(" ")).to.have.length(2);
    });
    cy.get("#sort-form").parents("astro-island").should("not.have.attr", "ssr");
    cy.get("#sort-form select").select("adrScore:desc");

    cy.location("pathname").should("eq", "/apis");
    cy.location("search").should("include", "q=api");
    cy.location("search").should("include", "sortBy=adrScore");
    cy.location("search").should("include", "sortOrder=desc");
    cy.get('#get-filters input[name="sortBy"]').should(
      "have.value",
      "adrScore",
    );
    cy.get('#get-filters input[name="sortOrder"]').should("have.value", "desc");
    cy.get('search input[type="hidden"][name="sortBy"]').should(
      "have.value",
      "adrScore",
    );
  });

  it("can navigate to a details page", () => {
    cy.visit("/");

    cy.get(".results ol li")
      .first()
      .find("h2")
      .invoke("text")
      .then((title) => {
        cy.get(".results ol li")
          .first()
          .find('[data-testid="rhc-card-as-link__link"] a')
          .click();

        cy.location("pathname").should("match", /^\/apis\/.+/);
        cy.get("main h2").should("contain.text", title.trim());
        cy.title().should("contain", title.trim());
        cy.metatag("description").should(
          "not.have.attr",
          "content",
          "Welkom bij het API-Register. Hier vind je informatie over de API's die beschikbaar zijn voor gebruik binnen de overheid.",
        );
        cy.og("description").should(
          "not.have.attr",
          "content",
          "Welkom bij het API-Register. Hier vind je informatie over de API's die beschikbaar zijn voor gebruik binnen de overheid.",
        );
        cy.og("image")
          .invoke("attr", "content")
          .should("include", "/don-api-register-detail-social-card.png");
        cy.og("image:alt").should(
          "have.attr",
          "content",
          "Details van deze API: OpenAPI Specificatie, Servers en authenticatie. API Design Rules score. Blijf op de hoogte over deze API.",
        );
      });
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

    cy.get("#get-api-key")
      .parents("astro-island")
      .should("not.have.attr", "ssr");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('button[type="submit"]').click();

    cy.get("input#api-key").should(
      "have.value",
      "c194e557-7357-a915-517e-1a2b3c4d5e5f",
    );
    cy.get('.utrecht-alert__message[role="status"]').should("be.visible");
  });
});
