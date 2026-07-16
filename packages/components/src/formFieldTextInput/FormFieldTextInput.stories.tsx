import type { Meta, StoryObj } from "@storybook/react-vite";
import FormFieldTextInput from "./FormFieldTextInput";

const meta = {
  title: "Components/Form/FormFieldTextInput",
  component: FormFieldTextInput,
  tags: ["autodocs", "re-export"],
  args: {
    label: "E-mailadres",
    placeholder: "naam@voorbeeld.nl",
  },
  argTypes: {
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    required: { control: "boolean" },
  },
} satisfies Meta<typeof FormFieldTextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    description: "We gebruiken dit e-mailadres alleen om contact op te nemen.",
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    errorMessage: "Vul een geldig e-mailadres in.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
