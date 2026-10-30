export interface RepoProvider {
  key: string;
  logo: string;
  name: string;
  alt: string;
}

interface ProviderDefinition extends RepoProvider {
  /** Hosts (and their subdomains) that belong to this provider. */
  hosts?: string[];
  /** Fallback for self-hosted instances, matched against the hostname. */
  hostPattern?: RegExp;
}

/**
 * Repository providers with their logos and alt text.
 * The first provider that matches the hostname wins, so more specific
 * providers (such as code.overheid.nl, which runs Forgejo) come first.
 */
const repoProviders: ProviderDefinition[] = [
  {
    key: "github",
    logo: "/logos/github-mark.svg",
    name: "GitHub",
    alt: "GitHub logo",
    hosts: ["github.com"],
  },
  {
    key: "codeoverheid",
    logo: "/logos/code-overheid-nl.svg",
    name: "code.overheid.nl",
    alt: "code.overheid.nl logo",
    hosts: ["code.overheid.nl"],
  },
  {
    key: "gitlab",
    logo: "/logos/gitlab-logo-500-rgb.svg",
    name: "GitLab",
    alt: "GitLab logo",
    hosts: ["gitlab.com"],
    hostPattern: /gitlab/i,
  },
  {
    key: "bitbucket",
    logo: "/logos/bitbucket-mark-brand-rgb.svg",
    name: "Bitbucket",
    alt: "Bitbucket logo",
    hosts: ["bitbucket.org"],
  },
  {
    key: "azure",
    logo: "/logos/azure-devops-icon.svg",
    name: "Azure DevOps",
    alt: "Azure DevOps logo",
    hosts: ["dev.azure.com", "visualstudio.com"],
    hostPattern: /azure/i,
  },
  {
    key: "codeberg",
    logo: "/logos/codeberg-logo_icon_blue.svg",
    name: "Codeberg",
    alt: "Codeberg logo",
    hosts: ["codeberg.org"],
  },
  {
    key: "forgejo",
    logo: "/logos/forgejo.svg",
    name: "Forgejo",
    alt: "Forgejo",
    hostPattern: /forgejo/i,
  },
];

const hostMatches = (hostname: string, host: string) =>
  hostname === host || hostname.endsWith(`.${host}`);

/**
 * Returns the provider of a repository URL, based on its hostname.
 * An explicit type (a provider key) takes precedence over the URL.
 */
export function getRepoProvider(
  url: string,
  type?: string,
): RepoProvider | undefined {
  const toProvider = ({
    key,
    logo,
    name,
    alt,
  }: ProviderDefinition): RepoProvider => ({ key, logo, name, alt });

  const byType = type
    ? repoProviders.find((provider) => provider.key === type)
    : undefined;
  if (byType) {
    return toProvider(byType);
  }

  let hostname: string;
  try {
    hostname = new URL(url).hostname.toLowerCase();
  } catch {
    return undefined;
  }

  const byHost =
    repoProviders.find((provider) =>
      provider.hosts?.some((host) => hostMatches(hostname, host)),
    ) ?? repoProviders.find((provider) => provider.hostPattern?.test(hostname));

  return byHost ? toProvider(byHost) : undefined;
}
