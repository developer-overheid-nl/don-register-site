import type { Meta, StoryObj } from "@storybook/react-vite";
import Filters from "./Filters";

const routing = {
  url: "https://developer.overheid.nl/apis",
  query: { organisation: "kadaster" },
};

const organisations = [
  { uri: "kadaster", label: "Kadaster" },
  { uri: "geonovum", label: "Geonovum" },
  { uri: "logius", label: "Logius" },
];

const meta = {
  title: "Components/Filters",
  component: Filters,
  tags: ["autodocs", "custom", "deprecated"],
  args: {
    data: organisations,
    headers: {},
    error: null,
    routing,
  },
  // parameters: {
  //   docs: {
  //     tags: []
  //   }
  // }
} satisfies Meta<typeof Filters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    data: [],
    error: { message: "Kan filters niet laden." },
    status: 500,
    statusText: "Internal Server Error",
  },
};
