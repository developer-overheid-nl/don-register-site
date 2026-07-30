import type { Meta, StoryObj } from "@storybook/react-vite";
import DataBadgeLink from "../dataBadgeLink/DataBadgeLink";
import HeadingGroup from "./HeadingGroup";

const headingLevels = [1, 2, 3, 4, 5] as const;

/**
 * HeadingGroup combineert een kop met een optionele subtitel, bijvoorbeeld
 * de naam van een API met daaronder de beherende organisatie.
 *
 * ## Wijzigingen tov RHC:
 * - Voegt `title`- en `subTitle`-props toe in plaats van losse
 *   `Heading`/`Paragraph`-children; een string-`subTitle` wordt automatisch
 *   in een `Paragraph` gezet, andere content (bijv. een badge) direct
 *   doorgegeven.
 */
const meta = {
  title: "Components/HeadingGroup",
  component: HeadingGroup,
  tags: ["autodocs", "remixed"],
  argTypes: {
    level: {
      control: "select",
      options: headingLevels,
    },
    appearanceLevel: {
      control: "select",
      options: headingLevels,
    },
  },
  args: {
    title: "Basisregistratie Adressen en Gebouwen API",
    level: 2,
    appearanceLevel: 4,
  },
} satisfies Meta<typeof HeadingGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    subTitle: "Kadaster",
  },
};

export const WithBadgeSubtitle: Story = {
  args: {
    subTitle: (
      <DataBadgeLink appearance="subtle" href="/apis?organisation=kadaster">
        Kadaster
      </DataBadgeLink>
    ),
  },
};

export const WithoutSubtitle: Story = {};
