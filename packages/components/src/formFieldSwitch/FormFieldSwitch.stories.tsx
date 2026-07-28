import type { Meta, StoryObj } from "@storybook/react-vite";
import FormFieldSwitch from "./FormFieldSwitch";

const meta = {
  title: "Components/Form/FormFieldSwitch",
  component: FormFieldSwitch,
  tags: ["autodocs", "custom"],
  args: {
    label: "",
    labelledById: "publiccode-label",
    labels: { on: "Aan", off: "Uit" },
    name: "publiccode",
    value: "true",
  },
  argTypes: {
    checked: { control: "boolean" },
    defaultChecked: { control: "boolean" },
    explicit: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <>
        <span id="publiccode-label" className="utrecht-form-label">
          Heeft publiccode.yml
        </span>
        <Story />
      </>
    ),
  ],
} satisfies Meta<typeof FormFieldSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAmount: Story = {
  args: {
    amount: 9,
  },
};

export const CheckedOn: Story = {
  args: {
    amount: 9,
    defaultChecked: true,
  },
};

export const Explicit: Story = {
  name: "Explicit (aan/uit als losse opties)",
  args: {
    explicit: true,
    value: ["true", "false"],
  },
};
