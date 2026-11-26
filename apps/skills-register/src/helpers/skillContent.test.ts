import { describe, expect, it } from "vitest";
import { skillFileUrl, stripFrontmatter } from "./skillContent";

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
