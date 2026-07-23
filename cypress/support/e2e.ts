// Shared Cypress e2e support can be registered here.

beforeEach(() => {
  cy.intercept("https://statistiek.rijksoverheid.nl/ppms.*", { log: false }).as(
    "piwikPing",
  );

  cy.request({ url: "/api/status/json", failOnStatusCode: false }).then(
    (response) => {
      if (response.status !== 200 || !response.body.up) {
        cy.visit("/api/status/html", { failOnStatusCode: false, log: false })
          .screenshot()
          .then(() => {
            Cypress.log({
              name: "Status",
              message: "Register site and/or API are DOWN!",
              consoleProps: () => ({
                Status: `${response.status} ${response.statusText}`,
                Body: response.body,
                Response: response,
              }),
            }).error(new Error("Abort testing!"));

            throw new Error();
          });
      } else {
        Cypress.log({
          name: "Status",
          message: "Register site and API are UP!",
          consoleProps: () => ({
            Status: `${response.status} ${response.statusText}`,
            Body: response.body,
            Response: response,
          }),
        });
      }
    },
  );
});
