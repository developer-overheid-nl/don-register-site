/** Strips the YAML frontmatter (`---` … `---`) from the start of a SKILL.md. */
export const stripFrontmatter = (content?: string): string => {
  if (!content) {
    return "";
  }
  const normalized = content.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n[\s\S]*?\n---[ \t]*(?:\n|$)/);
  return (match ? normalized.slice(match[0].length) : normalized).trim();
};

/** Link to the SKILL.md in the repository, at the harvested commit when known. */
export const skillFileUrl = (
  repoUrl: string,
  path: string,
  ref?: string,
): string => {
  const base = repoUrl.replace(/\/+$/, "").replace(/\.git$/, "");
  const cleanPath = path.replace(/^\/+/, "");
  return `${base}/blob/${ref || "HEAD"}/${cleanPath}`;
};
