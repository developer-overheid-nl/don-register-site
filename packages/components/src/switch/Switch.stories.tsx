import type { Meta, StoryObj } from "@storybook/react-vite";
import Switch from "./Switch";

/**
 * Switch is een aan/uit-schakelaar. In `explicit`-modus wordt de schakelaar
 * gerenderd als twee losse radio-opties (aan/uit) in plaats van één toggle,
 * met een aparte `aria-labelledby` in plaats van `aria-label`.
 */
const meta = {
  title: "Components/Form/FormFieldParts/Switch",
  component: Switch,
  tags: ["autodocs", "custom"],
  args: {
    name: "toggle-example",
    value: "true",
    "aria-label": "Toggle voorbeeld",
  },
  argTypes: {
    checked: { control: "boolean" },
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    defaultChecked: true,
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

export const Explicit: Story = {
  name: "Explicit (aan/uit als losse opties)",
  decorators: [
    (Story) => (
      <>
        <span id="switch-explicit-label" className="utrecht-form-label">
          Heeft publiccode.yml
        </span>
        <Story />
      </>
    ),
  ],
  args: {
    "aria-label": undefined,
    "aria-labelledby": "switch-explicit-label",
    explicit: true,
    value: ["true", "false"],
    labels: { on: "Aan", off: "Uit" },
  },
};
