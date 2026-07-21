import type { Meta, StoryObj } from "@storybook/react-vite";
import ReadOnlyTextInput from "./ReadOnlyTextInput";

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
};
