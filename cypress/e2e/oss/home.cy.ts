/// <reference types="cypress" />

describe("oss register", () => {
  it("loads the home page", { retries: 2 }, () => {
    cy.visit("/");

    cy.get("main").should("be.visible");

    // head tags
    cy.title().should(
      "eq",
      "Overzicht | Open Source Register - developer.overheid.nl",
    );
    cy.og("title").should("have.attr", "content", "Overzicht");
    cy.og("site_name").should(
      "have.attr",
      "content",
      "Open Source Register - developer.overheid.nl",
    );
    cy.metatag("description").should(
      "have.attr",
      "content",
      "Welkom bij het Open Source Register. Hier vind je informatie over de open source repositories die beschikbaar zijn voor gebruik binnen de overheid.",
    );
    cy.og("description").should(
      "have.attr",
      "content",
      "Welkom bij het Open Source Register. Hier vind je informatie over de open source repositories die beschikbaar zijn voor gebruik binnen de overheid.",
    );
    cy.og("image").should(
      "have.attr",
      "content",
      "/don-oss-register-social-card.png",
    );
    cy.og("image:alt").should(
      "have.attr",
      "content",
      "Open Source Register: Hier vind je informatie over de open source repositories die beschikbaar zijn voor gebruik binnen de overheid.",
    );
    cy.og("type").should("have.attr", "content", "website");
    cy.og("locale").should("have.attr", "content", "nl_NL");

    // content
    cy.get("main").then(($main) => {
      const results = $main.find(".results ol li");

      if (results.length > 0) {
        expect(results).to.have.length(20);
      } else {
        cy.wrap($main)
          .contains("Geen repositories gevonden.")
          .should("be.visible");
      }
    });
    cy.get(".filters #facetfilters input").should("have.length.above", 1);
  });

  it("shows pagination for results or an empty state", () => {
    cy.visit("/repositories/pagina/1");

    cy.get("main").then(($main) => {
      const nextPage = $main.find('[rel="next"]');

      if (nextPage.length > 0) {
        cy.wrap(nextPage).click();
        cy.location("pathname").should("match", /\/pagina\/2/);
        cy.get('[aria-current="true"]')
          .should("have.text", "2")
          .and(
            "have.attr",
            "aria-label",
            "Pagina 2: Resultaten 21 tot en met 40",
          );
      } else {
        cy.wrap($main)
          .contains("Geen repositories gevonden.")
          .should("be.visible");
      }
    });
  });

  it("can filter items", () => {
    cy.visit("/");

    cy.get("#facetfilters input").last().as("lastFilter");
    cy.get("#get-filters").as("filtersForm");
    cy.get('[aria-label="Huidige filters"] a').should("have.length", 1);

    cy.get("@lastFilter").then(($filter) => {
      const name = $filter.attr("name");
      const value = $filter.val();

      cy.wrap($filter).scrollIntoView().check();
      cy.get("@filtersForm").submit();
      cy.location("search").should(
        "include",
        `${name}=${encodeURIComponent(value)}`,
      );
    });
  });

  it("can sort repositories and preserve the query context", () => {
    cy.viewport(1440, 900);
    cy.visit("/repositories/pagina/2?q=code&sortBy=title&sortOrder=asc");

    cy.get(".results-toolbar").should(($toolbar) => {
      const styles = getComputedStyle($toolbar[0] as HTMLElement);

      expect(styles.display).to.equal("grid");
      expect(styles.gridTemplateColumns.split(" ")).to.have.length(2);
    });
    cy.get("#sort-form").parents("astro-island").should("not.have.attr", "ssr");
    cy.get("#sort-form select").select("lastActivity:desc");

    cy.location("pathname").should("eq", "/repositories");
    cy.location("search").should("include", "q=code");
    cy.location("search").should("include", "sortBy=lastActivity");
    cy.location("search").should("include", "sortOrder=desc");
    cy.get('#get-filters input[name="sortBy"]').should(
      "have.value",
      "lastActivity",
    );
    cy.get('#get-filters input[name="sortOrder"]').should("have.value", "desc");
    cy.get('search input[type="hidden"][name="sortBy"]').should(
      "have.value",
      "lastActivity",
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

        cy.location("pathname").should("match", /^\/repositories\/.+/);
        cy.get("main h2").should("contain.text", title.trim());
        cy.title().should("contain", title.trim());
        cy.metatag("description").should(
          "not.have.attr",
          "content",
          "Welkom bij het Open Source Register. Hier vind je informatie over de open source repositories die beschikbaar zijn voor gebruik binnen de overheid.",
        );
        cy.og("description").should(
          "not.have.attr",
          "content",
          "Welkom bij het Open Source Register. Hier vind je informatie over de open source repositories die beschikbaar zijn voor gebruik binnen de overheid.",
        );
        cy.og("image").should(
          "have.attr",
          "content",
          "/don-oss-register-detail-social-card.png",
        );
        cy.og("image:alt").should(
          "have.attr",
          "content",
          "Details van deze Open Source Repository: Beschrijving van de repository. Publiccode.yml.",
        );
      });
  });

  it("loads the toevoegen page", () => {
    cy.visit("/repositories/toevoegen");

    cy.get(".basic-content").should("be.visible");
    cy.get(
      'a[href="https://apis.developer.overheid.nl/apis/key-aanvragen"]',
    ).should("have.length.at.least", 1);
  });
});
