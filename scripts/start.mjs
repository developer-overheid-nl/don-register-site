import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { styleText } from "node:util";
import prompts from "prompts";

const HIDDEN = [/^start(:|$)/, /^changesets:/, /astro/];
const CATEGORIES = ["Apps", "Tests", "Tools"];
const TOOL_GROUPS = { chromatic: "storybook" };
const BACK = Symbol("back");

const { description, scripts } = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);

console.log(`
  ${styleText(["bold", "blue"], "developer.overheid.nl")} ${styleText("dim", "·")} ${description}

  Kies een groep en daarna een script om te starten.
  ${styleText("dim", "Typ om te filteren · ↑↓ om te kiezen · Enter om te bevestigen · Ctrl+C om te stoppen")}
`);

// App scripts follow `action:app` (e.g. `dev:api`) and are grouped per app;
// tests (`test:*`) are split into end-to-end (`test:e2e*`) and overige;
// everything else is a tool, grouped by prefix (e.g. `generate:oas:types` →
// generate).
const classify = (name) => {
  const [prefix, app] = name.split(":");
  if (["dev", "build", "preview"].includes(prefix)) {
    return { category: "Apps", group: app ?? "alle apps" };
  }
  if (prefix === "test") {
    return {
      category: "Tests",
      group: app === "e2e" ? "end-to-end" : "overige",
    };
  }
  return { category: "Tools", group: TOOL_GROUPS[name] ?? prefix };
};

const groups = new Map();
for (const [name, command] of Object.entries(scripts)) {
  if (HIDDEN.some((pattern) => pattern.test(name))) continue;
  const { category, group } = classify(name);
  const key = group ? `${category} › ${group}` : category;
  if (!groups.has(key)) groups.set(key, { category, group, items: [] });
  groups
    .get(key)
    .items.push({ title: name, description: command, value: name });
}

const sortedGroups = [...groups].sort(
  ([, a], [, b]) =>
    CATEGORIES.indexOf(a.category) - CATEGORIES.indexOf(b.category) ||
    (a.group === "alle apps") - (b.group === "alle apps"),
);

const onCancel = () => process.exit(0);

const pickGroup = async () => {
  const { group } = await prompts(
    {
      type: "autocomplete",
      name: "group",
      message: "Welk script wil je starten? Selecteer een groep.",
      choices: sortedGroups.map(([key, { category, group, items }]) => ({
        title: group
          ? `${styleText("dim", category.padEnd(6))}› ${group} (${items.length})`
          : `${category.padEnd(8)}(${items.length})`,
        description: items.map((item) => item.title).join(", "),
        value: key,
      })),
      limit: 15,
      suggest: (input, choices) => {
        const query = input.toLowerCase();
        return Promise.resolve(
          choices.filter(
            (choice) =>
              choice.value.toLowerCase().includes(query) ||
              groups
                .get(choice.value)
                .items.some((item) => item.title.includes(query)),
          ),
        );
      },
    },
    { onCancel },
  );
  return groups.get(group).items;
};

const pickScript = async (items) => {
  if (items.length === 1) return items[0].value;
  const { script } = await prompts(
    {
      type: "select",
      name: "script",
      message: "Welk script wil je starten?",
      choices: [{ title: "← terug", value: BACK }, ...items],
      initial: 1,
    },
    { onCancel },
  );
  return script;
};

let script = BACK;
while (script === BACK) {
  script = await pickScript(await pickGroup());
}

const extraArgs = process.argv.slice(2);
const args = ["run", script, ...(extraArgs.length ? ["--", ...extraArgs] : [])];

// Run pnpm without a shell (avoids DEP0190): `pnpm start` sets npm_execpath to
// pnpm's entry point, which is a JS file for npm/corepack installs and a binary
// for standalone installs.
const pnpmPath = process.env.npm_execpath;
const child = !pnpmPath
  ? spawn(`pnpm ${args.join(" ")}`, { stdio: "inherit", shell: true })
  : /\.[cm]?js$/.test(pnpmPath)
    ? spawn(process.execPath, [pnpmPath, ...args], { stdio: "inherit" })
    : spawn(pnpmPath, args, { stdio: "inherit" });
child.on("exit", (code) => process.exit(code ?? 1));
