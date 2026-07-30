import type { Meta, StoryObj } from "@storybook/react-vite";
import FormFieldCheckboxOption from "./FormFieldCheckboxOption";

/**
 * FormFieldCheckboxOption is een enkele checkbox binnen een
 * `FormFieldCheckboxGroup`, bijvoorbeeld voor een meerkeuze-filteroptie.
 *
 * ## Wijzigingen tov RHC:
 * - Voegt een `amount`-prop toe, getoond tussen haakjes achter het label
 *   (via `AmountLabel`).
 * - `children` worden getoond als extra info naast de optie (bijv. voor een
 *   ToolTip).
 */
const meta = {
  title: "Components/Form/FormFieldCheckboxOption",
  component: FormFieldCheckboxOption,
  tags: ["autodocs", "remixed"],
  args: {
    label: "Kadaster",
    name: "organisation",
    value: "kadaster",
  },
  argTypes: {
    checked: { control: "boolean" },
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
  },
} satisfies Meta<typeof FormFieldCheckboxOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAmount: Story = {
  args: {
    amount: 12,
  },
};

export const Checked: Story = {
  args: {
    amount: 12,
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    amount: 12,
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    amount: 12,
    invalid: true,
  },
};
