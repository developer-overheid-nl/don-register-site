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
  {
    key: "organisation-search",
    label: "Organisatie zoeken",
    description: "Filter op eigenaar of beheerder van de registratie.",
    type: "search-select",
    options: [
      {
        value: "kadaster",
        label: "Kadaster",
        count: 12,
        selected: false,
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
      {
        value: "rvo",
        label: "Rijksdienst voor Ondernemend Nederland",
        count: 5,
        selected: false,
      },
      {
        value: "cbs",
        label: "Centraal Bureau voor de Statistiek",
        count: 4,
        selected: false,
      },
      {
        value: "rws",
        label: "Rijkswaterstaat",
        count: 4,
        selected: false,
      },
      {
        value: "rvig",
        label: "Rijksdienst voor Identiteitsgegevens",
        count: 3,
        selected: false,
      },
      {
        value: "kvk",
        label: "Kamer van Koophandel",
        count: 3,
        selected: false,
      },
      {
        value: "belastingdienst",
        label: "Belastingdienst",
        count: 3,
        selected: false,
      },
      {
        value: "vng",
        label: "Vereniging van Nederlandse Gemeenten",
        count: 2,
        selected: false,
      },
      {
        value: "ictu",
        label: "ICTU",
        count: 2,
        selected: false,
      },
      {
        value: "rdw",
        label: "RDW",
        count: 2,
        selected: false,
      },
      {
        value: "uwv",
        label: "UWV",
        count: 1,
        selected: false,
      },
      {
        value: "duo",
        label: "Dienst Uitvoering Onderwijs",
        count: 1,
        selected: false,
      },
      {
        value: "gemeente-amsterdam",
        label: "Gemeente Amsterdam",
        count: 1,
        selected: false,
      },
      {
        value: "gemeente-utrecht",
        label: "Gemeente Utrecht",
        count: 1,
        selected: false,
      },
    ],
    showTop: 10,
  },
] as unknown as FilterData[];

/**
 * FacetFilters rendert een set filters (meerkeuze, enkele keuze en/of
 * schakelaars) op basis van een `filters`-array en meldt wijzigingen via
 * `onFilterChange`, eventueel gedebounced per filtertype.
 */
const meta = {
  title: "Components/FacetFilters",
  component: FacetFilters,
  tags: ["autodocs", "todo"],
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
