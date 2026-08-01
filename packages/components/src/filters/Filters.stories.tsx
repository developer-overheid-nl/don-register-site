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

/**
 * Filters toont een lijst van organisaties als navigatielinks en markeert de
 * organisatie uit de `routing`-query als actief filter.
 *
 * Verouderd: gebruik `FacetFilters` in plaats van dit component.
 */
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
