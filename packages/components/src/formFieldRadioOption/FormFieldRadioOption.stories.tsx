import type { Meta, StoryObj } from "@storybook/react-vite";
import FormFieldRadioOption from "./FormFieldRadioOption";

const meta = {
  title: "Components/Form/FormFieldRadioOption",
  component: FormFieldRadioOption,
  tags: ["autodocs", "custom"],
  args: {
    label: "Actief",
    name: "lifecycle",
    value: "active",
  },
  argTypes: {
    checked: { control: "boolean" },
    defaultChecked: { control: "boolean" },
    invalid: { control: "boolean" },
  },
} satisfies Meta<typeof FormFieldRadioOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAmount: Story = {
  args: {
    amount: 18,
  },
};

export const Checked: Story = {
  args: {
    amount: 18,
    defaultChecked: true,
  },
};

export const Invalid: Story = {
  args: {
    amount: 18,
    invalid: true,
  },
};
