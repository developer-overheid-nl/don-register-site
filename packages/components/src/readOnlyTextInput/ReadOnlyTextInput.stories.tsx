import type { Meta, StoryObj } from "@storybook/react-vite";
import ReadOnlyTextInput from "./ReadOnlyTextInput";

/**
 * ReadOnlyTextInput is een altijd-alleen-lezen tekstinvoerveld, bijvoorbeeld
 * voor het tonen van een ID of code. `fontVariant` kan een monospace of
 * "slashed zero"-lettertype toepassen om tekens beter te onderscheiden.
 */
const meta = {
  title: "Components/Form/ReadOnlyTextInput",
  component: ReadOnlyTextInput,
  tags: ["autodocs", "custom"],
  argTypes: {
    fontVariant: {
      control: "select",
      options: ["normal", "monospace", "slashed-zero"],
    },
  },
  args: {
    value: "c7819a6f-3e12-4b1a-9d0e-1f2a3b4c5d6e",
    fontVariant: "normal",
  },
} satisfies Meta<typeof ReadOnlyTextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Monospace: Story = {
  args: {
    fontVariant: "monospace",
  },
};

export const SlashedZero: Story = {
  args: {
    fontVariant: "slashed-zero",
    value: "0100200300",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Past `font-variant-numeric: slashed-zero` toe, maar het huidige Rijkshuisstijl-lettertype ondersteunt deze OpenType-variant nog niet, dus is er (nog) geen visueel verschil te zien.",
      },
    },
  },
};
