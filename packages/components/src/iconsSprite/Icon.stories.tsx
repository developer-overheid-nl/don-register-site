import type { Meta, StoryObj } from "@storybook/react-vite";
import AlignBox from "../alignBox/AlignBox";
import Grid from "../grid/Grid";
import Icon from "./Icon";

const iconNames = [
  "externe-link-inline",
  "plus-cirkel-inline",
  "kruis-inline",
  "delta-naar-rechts-inline",
  "active",
  "deprecated",
  "retired",
  "sunset",
  "kopieer-inline",
  "zoek-inline",
  "info",
  "trechter",
  "git-fork-inline",
  "variant-fork-inline",
  "lade-archiefkast",
];

/**
 * Icon rendert een icoon uit de sprite door middel van `name`, via een
 * `<svg><use></use></svg>`-referentie naar `#icon-{name}`. Vereist dat
 * `IconsSprite` ergens in het document is gerenderd, bijvoorbeeld eenmalig
 * in de layout:
 *
 * ```tsx
 * import { IconsSprite } from "@developer-overheid-nl/don-register-components";
 *
 * <IconsSprite />
 * ```
 *
 * In Storybook gebeurt dit al globaal, via een decorator in
 * `.storybook/preview.tsx`.
 */
const meta = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs", "custom"],
  args: {
    name: "info",
    "aria-label": "Info",
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllIcons: Story = {
  name: "Alle iconen in de sprite",
  decorators: [
    (Story) => (
      <Grid minColumnWidth="6rem" gap="medium">
        <Story />
      </Grid>
    ),
  ],
  render: () => (
    <>
      {iconNames.map((name) => (
        <AlignBox key={name} direction="column" gap="small">
          <Icon name={name} aria-label={name} width="2rem" height="2rem" />
          <code>{name}</code>
        </AlignBox>
      ))}
    </>
  ),
};
