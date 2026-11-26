import type { Meta, StoryObj } from "@storybook/react-vite";
import Paragraph from "../paragraph/Paragraph";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../table/Table";
import { AccordionProvider } from "./AccordionProvider";

/**
 * AccordionProvider rendert een lijst met uitklapbare secties op basis van
 * data. Het `label` van een sectie mag een string of een React-element zijn.
 */
const meta = {
  title: "Components/AccordionProvider",
  component: AccordionProvider,
  tags: ["autodocs", "remixed"],
} satisfies Meta<typeof AccordionProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

type Dependency = { file: string; direct: number; transitive: number };

const DependencyTable = ({
  caption,
  rows,
}: {
  caption: string;
  rows: Dependency[];
}) => (
  <Table>
    <TableCaption className="sr-only">{caption}</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHeaderCell scope="col">Definitiebestand</TableHeaderCell>
        <TableHeaderCell scope="col" alignCell="end">
          Direct
        </TableHeaderCell>
        <TableHeaderCell scope="col" alignCell="end">
          Transitive
        </TableHeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row.file}>
          <TableHeaderCell scope="row">{row.file}</TableHeaderCell>
          <TableCell alignCell="end">{row.direct}</TableCell>
          <TableCell alignCell="end">{row.transitive}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const npmRows: Dependency[] = [
  { file: "package.json", direct: 42, transitive: 1318 },
  { file: "apps/api-register/package.json", direct: 28, transitive: 764 },
  { file: "apps/oss-register/package.json", direct: 25, transitive: 701 },
  { file: "packages/components/package.json", direct: 19, transitive: 512 },
];

const mavenRows: Dependency[] = [
  { file: "pom.xml", direct: 14, transitive: 96 },
  { file: "service/pom.xml", direct: 9, transitive: 58 },
];

export const Default: Story = {
  args: {
    headingLevel: 3,
    sections: [
      {
        label: "npm",
        body: (
          <DependencyTable
            caption="Packagemanager npm, gesorteerd op Direct"
            rows={npmRows}
          />
        ),
        expanded: true,
      },
      {
        label: "Maven",
        body: (
          <DependencyTable
            caption="Packagemanager Maven, gesorteerd op Direct"
            rows={mavenRows}
          />
        ),
      },
      {
        label: "Go modules",
        body: <Paragraph>Geen definitiebestanden gevonden.</Paragraph>,
      },
    ],
  },
};

export const MetElementAlsLabel: Story = {
  args: {
    headingLevel: 3,
    sections: [
      {
        label: (
          <>
            <span>npm</span>
            &nbsp;&middot;&nbsp;
            <small>{`${npmRows.length} bestanden`}</small>
          </>
        ),
        body: (
          <DependencyTable
            caption="Packagemanager npm, gesorteerd op Direct"
            rows={npmRows}
          />
        ),
        expanded: true,
      },
      {
        label: (
          <>
            <span>Maven</span>
            &nbsp;&middot;&nbsp;
            <small>{`${mavenRows.length} bestanden`}</small>
          </>
        ),
        body: (
          <DependencyTable
            caption="Packagemanager Maven, gesorteerd op Direct"
            rows={mavenRows}
          />
        ),
      },
    ],
  },
};
