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

type InstallInput = {
  plugin?: { name: string };
  marketplaces?: { name?: string; url: string }[];
};

export type InstallCommands = {
  marketplaceAdd: string;
  pluginInstall: string;
  marketplaceUrl: string;
};

/**
 * Claude Code commands to install the plugin a skill belongs to, the same as
 * in the marketplace README. Returns null when the skill is not part of a
 * plugin in a named marketplace.
 */
export const installCommands = (
  skill: InstallInput,
): InstallCommands | null => {
  const marketplace = skill.marketplaces?.find((item) => item.name && item.url);
  if (!skill.plugin?.name || !marketplace?.name) {
    return null;
  }

  const github = marketplace.url.match(
    /^https:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/,
  );
  const source = github ? `${github[1]}/${github[2]}` : marketplace.url;

  return {
    marketplaceAdd: `claude plugin marketplace add ${source}`,
    pluginInstall: `claude plugin install ${skill.plugin.name}@${marketplace.name}`,
    marketplaceUrl: marketplace.url,
  };
};
