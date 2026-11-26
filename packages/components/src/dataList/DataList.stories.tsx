import type { Meta, StoryObj } from "@storybook/react-vite";
import DataBadge from "../dataBadge/DataBadge";
import Link from "../link/Link";
import {
  DataList,
  DataListActions,
  DataListItem,
  DataListKey,
  DataListValue,
} from "./DataList";

/**
 * Een data list toont een lijst met sleutel-waardeparen, bijvoorbeeld de
 * eigenschappen van een API of repository op een detailpagina. Het rendert een
 * HTML `<dl>`-element, met per paar een `DataListItem` met een `DataListKey`
 * (`<dt>`), `DataListValue` (`<dd>`) en eventueel `DataListActions`.
 *
 * Dit is een re-export van `DataList` uit `@utrecht/component-library-react`,
 * bedoeld om uit te proberen voor ons ontwerp en gebruik.
 */
const meta = {
  title: "Components/DataList",
  component: DataList,
  subcomponents: {
    DataListItem,
    DataListKey,
    DataListValue,
    DataListActions,
  },
  tags: ["autodocs", "re-export"],
  argTypes: {
    appearance: {
      control: "select",
      options: [undefined, "rows", "column"],
      description:
        "Variant van de lijst; wordt als `utrecht-data-list--appearance` modifier op de lijst gezet.",
    },
  },
  args: {
    children: (
      <>
        <DataListItem>
          <DataListKey>Organisatie</DataListKey>
          <DataListValue value="Kadaster">Kadaster</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListKey>Versie</DataListKey>
          <DataListValue value="1.2.0">1.2.0</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListKey>Laatst bijgewerkt</DataListKey>
          <DataListValue value="2026-11-19">19 november 2026</DataListValue>
        </DataListItem>
      </>
    ),
  },
} satisfies Meta<typeof DataList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Rows: Story = {
  args: { appearance: "rows" },
};

export const Column: Story = {
  args: { appearance: "column" },
};

export const EmptyValue: Story = {
  name: "Lege waarde",
  args: {
    children: (
      <>
        <DataListItem>
          <DataListKey>Organisatie</DataListKey>
          <DataListValue value="Geonovum">Geonovum</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListKey>Contactpersoon</DataListKey>
          <DataListValue emptyDescription="Niet opgegeven" />
        </DataListItem>
      </>
    ),
  },
};

export const MultilineValue: Story = {
  name: "Meerregelige waarde",
  args: {
    children: (
      <>
        <DataListItem>
          <DataListKey>Beschrijving</DataListKey>
          <DataListValue multiline>
            {
              "Dit API biedt toegang tot kadastrale gegevens.\nDe gegevens worden dagelijks bijgewerkt."
            }
          </DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListKey>Adres</DataListKey>
          <DataListValue multiline>
            {"Hofplein 20\n3032 AC Rotterdam"}
          </DataListValue>
        </DataListItem>
      </>
    ),
  },
};

export const WithActions: Story = {
  name: "Met acties",
  args: {
    children: (
      <>
        <DataListItem>
          <DataListKey>Specificatie</DataListKey>
          <DataListValue>openapi.json</DataListValue>
          <DataListActions>
            <Link href="#">Downloaden</Link>
          </DataListActions>
        </DataListItem>
        <DataListItem>
          <DataListKey>Documentatie</DataListKey>
          <DataListValue>docs.example.nl</DataListValue>
          <DataListActions>
            <Link href="#">Bekijken</Link>
          </DataListActions>
        </DataListItem>
      </>
    ),
  },
};

export const WithBadgesAndLinks: Story = {
  name: "Met badges en links",
  args: {
    children: (
      <>
        <DataListItem>
          <DataListKey>Status</DataListKey>
          <DataListValue>
            <DataBadge appearance="outlined">Actief</DataBadge>
          </DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListKey>Labels</DataListKey>
          <DataListValue>
            <DataBadge>REST</DataBadge> <DataBadge>Geo</DataBadge>{" "}
            <DataBadge appearance="subtle">Open data</DataBadge>
          </DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListKey>Repository</DataListKey>
          <DataListValue>
            <Link href="https://github.com/developer-overheid-nl">
              github.com/developer-overheid-nl
            </Link>
          </DataListValue>
        </DataListItem>
      </>
    ),
  },
};
