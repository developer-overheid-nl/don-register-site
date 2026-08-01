import type { Meta, StoryObj } from "@storybook/react-vite";
import Markdown from "./Markdown";

const sampleText = `## Over deze API

Deze API biedt toegang tot **adresgegevens** uit de BAG.

- Adressen
- Panden
- Verblijfsobjecten

Lees meer op [de documentatie](https://developer.overheid.nl).`;

/**
 * Markdown rendert `text` (of een string-`children`) via `react-markdown`.
 * Kopniveaus worden verschoven zodat het hoogste niveau nooit dieper is dan
 * `minHeadingDepth` (standaard 2), `openLinksInNewTab` opent links in een
 * nieuw tabblad, en `allowedElements` beperkt welke elementen gerenderd
 * worden.
 */
const meta = {
  title: "Components/Markdown",
  component: Markdown,
  tags: ["autodocs", "custom"],
  args: {
    text: sampleText,
  },
} satisfies Meta<typeof Markdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OpenLinksInNewTab: Story = {
  args: {
    openLinksInNewTab: true,
  },
};

export const RestrictedElements: Story = {
  name: "Beperkte elementen (bijv. kaartbeschrijving)",
  args: {
    text: "API voor het zoeken en raadplegen van adressen, panden, verblijfsobjecten en gerelateerde gegevens uit de BAG.\n\nLees meer op [de documentatie](https://developer.overheid.nl).",
    allowedElements: ["p", "a", "ul", "ol", "li"],
    openLinksInNewTab: true,
  },
};
