import type { Meta, StoryObj } from "@storybook/react-vite";
import FormFieldLabel from "./FormFieldLabel";

const meta = {
  title: "Components/Form/FormFieldLabel",
  component: FormFieldLabel,
  tags: ["autodocs", "re-export"],
  args: {
    children: "E-mailadres",
    htmlFor: "email",
  },
} satisfies Meta<typeof FormFieldLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
