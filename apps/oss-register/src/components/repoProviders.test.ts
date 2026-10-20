import { describe, expect, it } from "vitest";
import { getRepoProvider } from "./repoProviders";

describe("getRepoProvider", () => {
  it.each([
    ["https://github.com/developer-overheid-nl/don-crawler", "github"],
    ["https://gitlab.com/commonground/don", "gitlab"],
    ["https://gitlab.gemeente.nl/team/repo", "gitlab"],
    ["https://bitbucket.org/team/repo", "bitbucket"],
    ["https://dev.azure.com/org/project/_git/repo", "azure"],
    ["https://codeberg.org/cotralis/DbTaak_Scheduler", "codeberg"],
    ["https://code.overheid.nl/Kiesraad/Abacus", "codeoverheid"],
    ["https://code.overheid.nl/Kiesraad/Abacus.git", "codeoverheid"],
    ["https://forgejo.example.org/org/repo", "forgejo"],
  ])("matches %s to %s", (url, expected) => {
    expect(getRepoProvider(url)?.key).toBe(expected);
  });

  it("uses the code.overheid.nl name and logo", () => {
    const provider = getRepoProvider(
      "https://code.overheid.nl/Logius/api-design-rules",
    );

    expect(provider?.name).toBe("code.overheid.nl");
    expect(provider?.logo).toBe("/logos/code-overheid-nl.svg");
  });

  it("matches on the host, not on the repository path", () => {
    expect(getRepoProvider("https://github.com/acme/gitlab-tools")?.key).toBe(
      "github",
    );
    expect(
      getRepoProvider("https://code.overheid.nl/MinBZK/github-sync")?.key,
    ).toBe("codeoverheid");
  });

  it("is case insensitive", () => {
    expect(getRepoProvider("https://GitHub.com/Org/Repo")?.key).toBe("github");
  });

  it("prefers an explicit type", () => {
    expect(
      getRepoProvider("https://git.example.org/org/repo", "gitlab")?.key,
    ).toBe("gitlab");
  });

  it("returns undefined for unknown hosts and invalid urls", () => {
    expect(getRepoProvider("https://git.example.org/org/repo")).toBeUndefined();
    expect(getRepoProvider("not a url")).toBeUndefined();
    expect(getRepoProvider("")).toBeUndefined();
  });
});
