import type { Meta, StoryObj } from "@storybook/react-vite";
import Logo from "../../../../proprietary-example/logos/react/Logo";

const meta = {
  title: "Components/SiteLogo/Voorbeeldlogo (proprietary-example)",
  component: Logo,
  tags: ["autodocs", "custom"],
  argTypes: {
    forced: {
      control: "select",
      options: [false, "light", "dark"],
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ForcedLight: Story = {
  name: "Forced light",
  args: {
    forced: "light",
  },
};

export const ForcedDark: Story = {
  name: "Forced dark",
  args: {
    forced: "dark",
  },
};
