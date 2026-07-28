import type { Meta, StoryObj } from "@storybook/react-vite";
import Paragraph from "./Paragraph";

const meta = {
  title: "Components/Paragraph",
  component: Paragraph,
  tags: ["autodocs", "remixed"],
  argTypes: {
    purpose: {
      control: "select",
      options: [undefined, "lead", "short"],
    },
  },
  args: {
    children:
      "API voor het zoeken en raadplegen van adressen, panden, verblijfsobjecten en gerelateerde gegevens uit de BAG.",
  },
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Lead: Story = {
  args: {
    purpose: "lead",
  },
};

export const Short: Story = {
  name: "Short (bijv. filterbeschrijving)",
  args: {
    purpose: "short",
    children: "Filter op eigenaar of beheerder van de registratie.",
  },
};
