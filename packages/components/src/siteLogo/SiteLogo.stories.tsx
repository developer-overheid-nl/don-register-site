import type { Meta, StoryObj } from "@storybook/react-vite";
import SiteLogo from "./SiteLogo";

const meta = {
  title: "Components/SiteLogo",
  component: SiteLogo,
  tags: ["autodocs", "custom"],
  args: {
    isRoot: false,
    href: "https://developer.overheid.nl",
  },
} satisfies Meta<typeof SiteLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Linked: Story = {};

export const Root: Story = {
  name: "Op de homepage (geen link)",
  args: {
    isRoot: true,
  },
};
