import type { Meta, StoryObj } from "@storybook/react-vite";
import type { FilterData } from "./FacetFilters";
import FacetFilters from "./FacetFilters";

const filters = [
  {
    key: "organisation",
    label: "Organisatie",
    description: "Filter op eigenaar of beheerder van de registratie.",
    type: "multi-select",
    options: [
      {
        value: "kadaster",
        label: "Kadaster",
        count: 12,
        selected: true,
      },
      {
        value: "geonovum",
        label: "Geonovum",
        description: "Standaardisatieorganisatie voor geografische informatie.",
        count: 8,
        selected: false,
      },
      {
        value: "logius",
        label: "Logius",
        count: 5,
        selected: false,
      },
    ],
  },
  {
    key: "lifecycle",
    label: "Levensfase",
    description: "Toon alleen registraties met deze levensfase.",
    type: "single-select",
    options: [
      {
        value: "active",
        label: "Actief",
        count: 18,
        selected: true,
      },
      {
        value: "deprecated",
        label: "Verouderd",
        count: 2,
        selected: false,
      },
    ],
  },
  {
    key: "publiccode",
    label: ["Heeft publiccode.yml", "Heeft geen publiccode.yml"],
    description:
      "Filter repositories op aanwezigheid van een publiccode.yml bestand.",
    type: "toggle",
    value: true,
    count: 9,
    isExplicitFalse: true,
  },
] as unknown as FilterData[];

const meta = {
  title: "Components/FacetFilters",
  component: FacetFilters,
  tags: ["autodocs"],
  parameters: {
    layout: "narrow",
  },
  args: {
    title: "Filters",
    filters,
    explicitFalseFilters: ["publiccode"],
  },
} satisfies Meta<typeof FacetFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    filters: [],
  },
};
