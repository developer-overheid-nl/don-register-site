import type { Meta, StoryObj } from "@storybook/react-vite";
import Container from "./Container";

/**
 * Container centreert zijn inhoud en beperkt deze tot de maximale
 * paginabreedte, met responsieve inline-padding. Wordt bijvoorbeeld gebruikt
 * om de Header op dezelfde breedte te houden als de rest van de pagina.
 */
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
