import { describe, expect, it } from "vitest";
import {
  installCommands,
  skillFileUrl,
  stripFrontmatter,
} from "./skillContent";

describe("stripFrontmatter", () => {
  it("removes the frontmatter", () => {
    expect(
      stripFrontmatter(
        "---\nname: test\ndescription: x\n---\n\n# Titel\n\nTekst",
      ),
    ).toBe("# Titel\n\nTekst");
  });

  it("handles CRLF and a BOM", () => {
    expect(stripFrontmatter("\uFEFF---\r\nname: test\r\n---\r\nTekst")).toBe(
      "Tekst",
    );
  });

  it("keeps content without frontmatter", () => {
    expect(stripFrontmatter("# Titel\n\n---\n\nTekst")).toBe(
      "# Titel\n\n---\n\nTekst",
    );
  });

  it("returns an empty string for empty input", () => {
    expect(stripFrontmatter(undefined)).toBe("");
  });
});

describe("skillFileUrl", () => {
  it("links to the file at the harvested commit", () => {
    expect(
      skillFileUrl(
        "https://github.com/org/repo/",
        "/skills/a/SKILL.md",
        "abc123",
      ),
    ).toBe("https://github.com/org/repo/blob/abc123/skills/a/SKILL.md");
  });

  it("falls back to HEAD and strips .git", () => {
    expect(skillFileUrl("https://github.com/org/repo.git", "SKILL.md")).toBe(
      "https://github.com/org/repo/blob/HEAD/SKILL.md",
    );
  });
});

describe("installCommands", () => {
  const marketplace = {
    name: "overheid-plugins",
    url: "https://github.com/developer-overheid-nl/skills-marketplace",
  };

  it("uses owner/repo for a GitHub marketplace", () => {
    expect(
      installCommands({
        plugin: { name: "nerds" },
        marketplaces: [marketplace],
      }),
    ).toEqual({
      marketplaceAdd:
        "claude plugin marketplace add developer-overheid-nl/skills-marketplace",
      pluginInstall: "claude plugin install nerds@overheid-plugins",
      marketplaceUrl: marketplace.url,
    });
  });

  it("keeps other URLs as they are", () => {
    expect(
      installCommands({
        plugin: { name: "x" },
        marketplaces: [
          { name: "m", url: "https://github.com/org/repo/tree/main/plugins" },
        ],
      })?.marketplaceAdd,
    ).toBe(
      "claude plugin marketplace add https://github.com/org/repo/tree/main/plugins",
    );
  });

  it("returns null without a plugin or a named marketplace", () => {
    expect(installCommands({ marketplaces: [marketplace] })).toBeNull();
    expect(
      installCommands({
        plugin: { name: "x" },
        marketplaces: [{ url: marketplace.url }],
      }),
    ).toBeNull();
    expect(installCommands({ plugin: { name: "x" } })).toBeNull();
  });
});
