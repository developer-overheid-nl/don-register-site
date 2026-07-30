import type { Meta, StoryObj } from "@storybook/react-vite";
import Block from "./Block";

/**
 * Block is een generiek containerelement met een optionele achtergrond/rand
 * (`appearance`) en eenvoudige flex-layout (`layout`), vaak gebruikt om
 * andere componenten in te groeperen.
 */
const meta = {
  title: "Components/Block",
  component: Block,
  tags: ["autodocs", "custom"],
  argTypes: {
    appearance: {
      control: "select",
      options: ["clear", "outlined", "filled"],
    },
    layout: {
      control: "select",
      options: ["full", "flex-row", "flex-col"],
    },
  },
  args: {
    appearance: "filled",
    layout: "full",
    children: "Dit is de inhoud van het blok.",
  },
} satisfies Meta<typeof Block>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {};

export const Outlined: Story = {
  args: {
    appearance: "outlined",
  },
};

export const Clear: Story = {
  args: {
    appearance: "clear",
  },
};

export const FlexRow: Story = {
  args: {
    layout: "flex-row",
    children: (
      <>
        <span>Een</span>
        <span>Twee</span>
        <span>Drie</span>
      </>
    ),
  },
};
