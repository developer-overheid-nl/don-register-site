import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor } from "storybook/test";
import type { FilterData } from "./FacetFilters";
import FacetFilters from "./FacetFilters";

const organisationFilter = {
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
} as unknown as FilterData;

const lifecycleFilter = {
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
      description: "Wordt nog ondersteund, maar niet meer doorontwikkeld.",
      count: 2,
      selected: false,
    },
  ],
} as unknown as FilterData;

const publiccodeFilter = {
  key: "publiccode",
  label: "Heeft publiccode.yml",
  description:
    "Filter repositories op aanwezigheid van een publiccode.yml bestand.",
  type: "toggle",
  value: true,
  count: 9,
} as unknown as FilterData;

const organisationSearchFilter = {
  key: "organisation-search",
  label: "Organisatie zoeken",
  description: "Zoek en kies één eigenaar of beheerder van de registratie.",
  type: "search-select",
  showTop: 5,
  options: [
    { value: "kadaster", label: "Kadaster", count: 12, selected: false },
    {
      value: "geonovum",
      label: "Geonovum",
      description: "Standaardisatieorganisatie voor geografische informatie.",
      count: 8,
      selected: false,
    },
    { value: "logius", label: "Logius", count: 5, selected: false },
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
    { value: "rws", label: "Rijkswaterstaat", count: 4, selected: false },
    {
      value: "rvig",
      label: "Rijksdienst voor Identiteitsgegevens",
      count: 3,
      selected: false,
    },
    { value: "kvk", label: "Kamer van Koophandel", count: 3, selected: false },
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
    { value: "ictu", label: "ICTU", count: 2, selected: false },
    { value: "rdw", label: "RDW", count: 2, selected: false },
    { value: "uwv", label: "UWV", count: 1, selected: false },
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
} as unknown as FilterData;

/**
 * FacetFilters rendert de filterkolom van een registeroverzicht op basis van
 * een `filters`-array uit de API. Per filter wordt een kop, een korte
 * omschrijving en een invoer getoond, met per optie het aantal resultaten:
 *
 * - `multi-select`: meerdere opties tegelijk (checkboxes)
 * - `single-select`: één optie of "Alle" (radio buttons)
 * - `toggle`: aan/uit-schakelaar; met `explicitFalseFilters` als losse aan/uit-opties
 * - `search-select`: één optie kiezen uit een lange lijst, met zoekveld en "Toon meer"
 *
 * Wijzigingen worden gemeld via `onFilterChange` én een `onFilterChange`
 * CustomEvent op het element (voor gebruik buiten React). Voor `single-select`
 * en `date` wordt de melding standaard 600 ms gedebounced.
 */
const meta = {
  title: "Components/FacetFilters",
  component: FacetFilters,
  tags: ["autodocs", "custom"],
  parameters: {
    layout: "narrow",
  },
  args: {
    title: "Filters",
    filters: [
      organisationFilter,
      lifecycleFilter,
      publiccodeFilter,
      organisationSearchFilter,
    ],
    explicitFalseFilters: ["publiccode"],
    onFilterChange: fn(),
  },
} satisfies Meta<typeof FacetFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Alle filtertypes",
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("heading", { level: 2, name: "Filters" }),
    ).toBeVisible();
    for (const name of [
      "Organisatie",
      "Levensfase",
      "Heeft publiccode.yml",
      "Organisatie zoeken",
    ]) {
      await expect(
        canvas.getByRole("heading", { level: 3, name }),
      ).toBeInTheDocument();
    }
  },
};

export const MultiSelect: Story = {
  name: "Meerkeuze",
  args: {
    filters: [organisationFilter],
  },
  play: async ({ args, canvas }) => {
    await expect(
      canvas.getByRole("checkbox", { name: /Kadaster/ }),
    ).toBeChecked();
    await expect(
      canvas.getByRole("button", { name: "Informatie over Geonovum" }),
    ).toBeInTheDocument();

    const geonovum = canvas.getByRole<HTMLInputElement>("checkbox", {
      name: /Geonovum/,
    });
    await userEvent.click(geonovum);

    await expect(args.onFilterChange).toHaveBeenLastCalledWith({
      organisation: ["kadaster", "geonovum"],
    });

    // Leave the story in its starting state
    geonovum.checked = false;
  },
};

export const SingleSelect: Story = {
  name: "Enkele keuze",
  args: {
    filters: [lifecycleFilter],
  },
  play: async ({ args, canvas }) => {
    const active = canvas.getByRole<HTMLInputElement>("radio", {
      name: /Actief/,
    });
    await expect(active).toBeChecked();
    await expect(canvas.getByRole("radio", { name: "Alle" })).not.toBeChecked();

    await userEvent.click(canvas.getByRole("radio", { name: /Verouderd/ }));

    // Single-select changes are debounced
    await expect(args.onFilterChange).not.toHaveBeenCalled();
    await waitFor(() =>
      expect(args.onFilterChange).toHaveBeenLastCalledWith({
        lifecycle: ["deprecated"],
      }),
    );

    await userEvent.click(canvas.getByRole("radio", { name: "Alle" }));

    await waitFor(() =>
      expect(args.onFilterChange).toHaveBeenLastCalledWith({ lifecycle: [] }),
    );

    // Leave the story in its starting state
    active.checked = true;
  },
};

export const Toggle: Story = {
  name: "Schakelaar",
  args: {
    filters: [publiccodeFilter],
    explicitFalseFilters: [],
  },
  play: async ({ args, canvas }) => {
    const toggle = canvas.getByRole<HTMLInputElement>("switch", {
      name: /publiccode\.yml bestand\.\s+\(9\)$/,
    });
    await expect(toggle).toBeChecked();

    await userEvent.click(toggle);

    await expect(toggle).not.toBeChecked();
    await expect(args.onFilterChange).toHaveBeenLastCalledWith({
      publiccode: ["false"],
    });

    // Leave the story in its starting state
    toggle.checked = true;
  },
};

export const ToggleExplicitFalse: Story = {
  name: "Schakelaar met expliciet 'uit'",
  args: {
    filters: [{ ...publiccodeFilter, value: false } as FilterData],
    explicitFalseFilters: ["publiccode"],
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("group", { name: /publiccode\.yml bestand\.\s+\(9\)$/ }),
    ).toBeInTheDocument();
    const on = canvas.getByRole("radio", { name: "Aan" });
    const off = canvas.getByRole("radio", { name: "Uit" });
    await expect(on).toHaveAttribute("value", "true");
    await expect(off).toHaveAttribute("value", "false");
    await expect(off).toBeChecked();
    await expect(on).not.toBeChecked();
  },
};

export const SearchSelect: Story = {
  name: "Zoeken in opties",
  args: {
    filters: [organisationSearchFilter],
  },
  play: async ({ args, canvas, step }) => {
    await step("Toont standaard alleen de top 5", async () => {
      await expect(canvas.getAllByRole("radio")).toHaveLength(5);
      await expect(
        canvas.queryByRole("radio", { name: /Gemeente Utrecht/ }),
      ).not.toBeInTheDocument();
    });

    await step("Toon meer / Toon minder", async () => {
      await userEvent.click(canvas.getByRole("button", { name: /Toon meer/ }));
      await expect(canvas.getAllByRole("radio")).toHaveLength(16);
      await userEvent.click(
        canvas.getByRole("button", { name: /Toon minder/ }),
      );
      await expect(canvas.getAllByRole("radio")).toHaveLength(5);
    });

    const search = canvas.getByRole("searchbox");

    await step("Zoeken filtert de opties", async () => {
      await userEvent.type(search, "rijks");
      await expect(canvas.getAllByRole("radio")).toHaveLength(3);
      await expect(
        canvas.queryByRole("button", { name: /Toon meer/ }),
      ).not.toBeInTheDocument();
    });

    // Logius is in the top 5, so the list looks the same again once it is unchecked
    await step("Gekozen optie blijft zichtbaar", async () => {
      await userEvent.clear(search);
      await userEvent.type(search, "logius");
      await userEvent.click(canvas.getByRole("radio", { name: /Logius/ }));
      await expect(args.onFilterChange).toHaveBeenLastCalledWith({
        "organisation-search": ["logius"],
      });
      await userEvent.clear(search);
      await userEvent.type(search, "gemeente");
      await expect(canvas.getByRole("radio", { name: /Logius/ })).toBeChecked();
    });

    await step("Geen resultaten", async () => {
      await userEvent.clear(search);
      await userEvent.type(search, "xyz");
      await expect(canvas.getByRole("status")).toHaveTextContent(
        "Geen opties gevonden",
      );
    });

    await step("Terug naar de beginstand", async () => {
      await userEvent.clear(search);
      canvas.getByRole<HTMLInputElement>("radio", {
        name: /Logius/,
      }).checked = false;
      await expect(canvas.getAllByRole("radio")).toHaveLength(5);
      for (const radio of canvas.getAllByRole("radio")) {
        await expect(radio).not.toBeChecked();
      }
    });
  },
};

export const WithoutTitle: Story = {
  name: "Zonder titel",
  args: {
    title: undefined,
    filters: [organisationFilter, lifecycleFilter],
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("heading", { level: 2, name: "Organisatie" }),
    ).toBeInTheDocument();
  },
};

export const Empty: Story = {
  name: "Geen filters",
  args: {
    filters: [],
  },
};
