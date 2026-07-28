import type { Meta, StoryObj } from "@storybook/react-vite";
import TopNavigation from "./TopNavigation";

const items = [
  { id: "home", label: "Home", href: "https://developer.overheid.nl" },
  {
    id: "kennisbank",
    label: "Kennisbank",
    href: "https://developer.overheid.nl/kennisbank",
  },
  { id: "apis", label: "API's", href: "/apis", current: true },
  {
    id: "oss",
    label: "Repositories",
    href: "https://oss.developer.overheid.nl",
  },
  {
    id: "communities",
    label: "Communities",
    href: "https://developer.overheid.nl/communities",
  },
  { id: "blog", label: "Blog", href: "https://developer.overheid.nl/blog" },
];

const endItems = [
  {
    id: "opendata",
    label: "Open Data",
    href: "https://data.overheid.nl",
    icon: "_external",
  },
  {
    id: "geodata",
    label: "Geodata",
    href: "https://www.pdok.nl",
    icon: "_external",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/developer-overheid-nl/don-register-site",
    icon: "_external",
  },
];

const meta = {
  title: "Components/TopNavigation",
  component: TopNavigation,
  tags: ["autodocs", "custom"],
  args: {
    items,
    endItems,
  },
} satisfies Meta<typeof TopNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutEndItems: Story = {
  args: {
    endItems: undefined,
  },
};
