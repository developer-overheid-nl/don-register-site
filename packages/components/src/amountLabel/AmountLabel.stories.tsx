import type { Meta, StoryObj } from "@storybook/react-vite";
import AmountLabel from "./AmountLabel";

/**
 * Toont een label met optioneel een aantal tussen haakjes, bijvoorbeeld
 * "Kadaster (12)". Wordt onder andere gebruikt als label voor filteropties
 * (checkboxes, radio's en switches) om het aantal resultaten te tonen.
 */
const meta = {
  title: "Components/Form/FormFieldParts/AmountLabel",
  component: AmountLabel,
  tags: ["autodocs", "custom"],
  args: {
    label: "API's",
    amount: 12,
  },
} satisfies Meta<typeof AmountLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutAmount: Story = {
  args: {
    amount: undefined,
  },
};
