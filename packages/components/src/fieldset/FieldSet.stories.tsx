import type { Meta, StoryObj } from "@storybook/react-vite";
import FieldSet from "./FieldSet";

const meta = {
  title: "Components/Form/FieldSet",
  component: FieldSet,
  tags: ["autodocs", "re-export"],
  args: {
    legend: "Contactgegevens",
    children: "Veldinhoud van de fieldset.",
  },
  argTypes: {
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    section: { control: "boolean" },
  },
} satisfies Meta<typeof FieldSet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Section: Story = {
  args: {
    section: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
  },
};
