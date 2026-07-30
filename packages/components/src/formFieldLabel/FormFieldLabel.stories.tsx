import type { Meta, StoryObj } from "@storybook/react-vite";
import FormFieldLabel from "./FormFieldLabel";

/**
 * FormFieldLabel is een label voor een formulierveld, met de
 * `utrecht-form-label`-stijl van RHC.
 */
const meta = {
  title: "Components/Form/FormFieldLabel",
  component: FormFieldLabel,
  tags: ["autodocs", "custom"],
  args: {
    children: "E-mailadres",
    htmlFor: "email",
  },
} satisfies Meta<typeof FormFieldLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
