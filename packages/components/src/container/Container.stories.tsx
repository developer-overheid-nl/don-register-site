import type { Meta, StoryObj } from "@storybook/react-vite";
import Container from "./Container";

const meta = {
  title: "Components/Container",
  component: Container,
  tags: ["autodocs", "custom"],
  args: {
    children: "Dit is de inhoud van de container.",
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
