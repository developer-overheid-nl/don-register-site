import type { Meta, StoryObj } from "@storybook/react-vite";
import Link from "../link/Link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "./Table";

const rows = [
  { schema: "Gebouw", organisatie: "Kadaster", versie: "2.1.0", velden: 24 },
  { schema: "Adres", organisatie: "Kadaster", versie: "1.4.2", velden: 12 },
  {
    schema: "Omgevingsplan",
    organisatie: "Geonovum",
    versie: "3.0.0",
    velden: 58,
  },
];

/**
 * Een tabel toont gegevens in rijen en kolommen, bijvoorbeeld de
 * afhankelijkheden van een schema. De tabel bestaat uit `Table`,
 * `TableCaption`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`,
 * `TableHeaderCell` en `TableCell`.
 *
 * Dit is een re-export van de tabelcomponenten uit
 * `@rijkshuisstijl-community/components-react`.
 */
const meta = {
  title: "Components/Table",
  component: Table,
  subcomponents: {
    TableCaption,
    TableHeader,
    TableBody,
    TableFooter,
    TableRow,
    TableHeaderCell,
    TableCell,
  },
  tags: ["autodocs", "re-export"],
  args: {
    children: (
      <>
        <TableCaption>Schema&apos;s per organisatie</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHeaderCell scope="col">Schema</TableHeaderCell>
            <TableHeaderCell scope="col">Organisatie</TableHeaderCell>
            <TableHeaderCell scope="col">Versie</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(({ schema, organisatie, versie }) => (
            <TableRow key={schema}>
              <TableCell>{schema}</TableCell>
              <TableCell>{organisatie}</TableCell>
              <TableCell>{versie}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </>
    ),
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLinks: Story = {
  name: "Met links",
  args: {
    children: (
      <>
        <TableCaption>Afhankelijkheden van dit schema</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHeaderCell scope="col">Schema</TableHeaderCell>
            <TableHeaderCell scope="col">Gebruikt in</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Link href="#">Gebouw</Link>
            </TableCell>
            <TableCell>#/components/schemas/Pand</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Link href="#">Adres</Link>
            </TableCell>
            <TableCell>#/components/schemas/Verblijfsobject</TableCell>
          </TableRow>
        </TableBody>
      </>
    ),
  },
};

export const AlignedCells: Story = {
  name: "Uitgelijnde cellen",
  args: {
    children: (
      <>
        <TableCaption>Aantal velden per schema</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHeaderCell scope="col">Schema</TableHeaderCell>
            <TableHeaderCell scope="col" alignCell="center">
              Versie
            </TableHeaderCell>
            <TableHeaderCell scope="col" alignCell="end">
              Velden
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(({ schema, versie, velden }) => (
            <TableRow key={schema}>
              <TableCell>{schema}</TableCell>
              <TableCell alignCell="center">{versie}</TableCell>
              <TableCell alignCell="end">{velden}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </>
    ),
  },
};

export const WithSorting: Story = {
  name: "Met sortering",
  args: {
    children: (
      <>
        <TableCaption>Schema&apos;s, gesorteerd op naam</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHeaderCell scope="col" withSorting aria-sort="ascending">
              Schema
            </TableHeaderCell>
            <TableHeaderCell scope="col" withSorting aria-sort="none">
              Organisatie
            </TableHeaderCell>
            <TableHeaderCell scope="col" withSorting aria-sort="none">
              Versie
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...rows]
            .sort((a, b) => a.schema.localeCompare(b.schema, "nl"))
            .map(({ schema, organisatie, versie }) => (
              <TableRow key={schema}>
                <TableCell>{schema}</TableCell>
                <TableCell>{organisatie}</TableCell>
                <TableCell>{versie}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </>
    ),
  },
};

export const WithFooter: Story = {
  name: "Met voettekst",
  args: {
    children: (
      <>
        <TableCaption>Aantal velden per schema</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHeaderCell scope="col">Schema</TableHeaderCell>
            <TableHeaderCell scope="col" alignCell="end">
              Velden
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(({ schema, velden }) => (
            <TableRow key={schema}>
              <TableCell>{schema}</TableCell>
              <TableCell alignCell="end">{velden}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableHeaderCell scope="row">Totaal</TableHeaderCell>
            <TableCell alignCell="end">
              {rows.reduce((totaal, { velden }) => totaal + velden, 0)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </>
    ),
  },
};
