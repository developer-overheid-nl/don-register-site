import type { Meta, StoryObj } from "@storybook/react-vite";
import AmountLabel from "./AmountLabel";

const meta = {
  title: "Components/AmountLabel",
  component: AmountLabel,
  tags: ["autodocs", "custom"],
  args: {
    label: "API's",
    amount: 12,
  },
} satisfies Meta<typeof AmountLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutAmount: Story = {
  args: {
    amount: undefined,
  },
};
