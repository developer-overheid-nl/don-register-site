import type { Meta, StoryObj } from "@storybook/react-vite";
import Article from "./Article";

const meta = {
  title: "Components/Article",
  component: Article,
  tags: ["autodocs", "re-export"],
  args: {
    children: "Dit is de inhoud van het artikel.",
  },
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
