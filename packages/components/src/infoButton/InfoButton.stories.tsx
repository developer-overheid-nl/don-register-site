import type { Meta, StoryObj } from "@storybook/react-vite";
import InfoButton from "./InfoButton";

const meta = {
  title: "Components/InfoButton",
  component: InfoButton,
  tags: ["autodocs", "custom"],
  argTypes: {
    iconSize: {
      control: "select",
      options: ["small", "default", "large"],
    },
    iconColor: {
      control: "select",
      options: ["default", "current"],
    },
  },
  args: {
    "aria-label": "Meer informatie",
  },
} satisfies Meta<typeof InfoButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    iconSize: "small",
  },
};

export const Large: Story = {
  args: {
    iconSize: "large",
  },
};

export const CurrentColor: Story = {
  name: "Current color (erft tekstkleur)",
  render: (args) => (
    <span style={{ color: "rebeccapurple" }}>
      <InfoButton {...args} iconColor="current" />
    </span>
  ),
};
