import type { Meta, StoryObj } from "@storybook/react-vite";
import Heading from "./Heading";

const headingLevels = [1, 2, 3, 4, 5] as const;

/**
 * Headings worden gebruikt voor titels in de tekstuele hiërarchie van de content.
 * Het rendert een HTML `<h1>`...`<h6>`-element.
 *
 * - **level**: wijzigt de HTML-tag naar het overeenkomende niveau.
 * - **appearanceLevel** (optioneel): verandert het uiterlijk, niet het `level`.
 */
const meta = {
  title: "Components/Heading",
  component: Heading,
  tags: ["autodocs", "re-export"],
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
    level: 1,
    children: "API-register",
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DecoupledAppearance: Story = {
  name: "Semantisch niveau los van weergave",
  args: {
    level: 2,
    appearanceLevel: 5,
    children: "Organisatie",
  },
};

export const AllLevels: Story = {
  args: {
    children: "",
  },
  render: () => (
    <>
      {headingLevels.map((level) => (
        <Heading key={level} level={level}>
          Kop niveau {level}
        </Heading>
      ))}
    </>
  ),
};
