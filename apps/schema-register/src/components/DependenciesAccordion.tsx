import {
  Link,
  Paragraph,
} from "@developer-overheid-nl/don-register-components";
import {
  AccordionProvider,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@rijkshuisstijl-community/components-react";

type DependencyRow = {
  at: string;
  href?: string;
  schemaLabel: string;
};

type DependencyGroup = {
  emptyMessage: string;
  rows: DependencyRow[];
  title: string;
};

type DependenciesAccordionProps = {
  groups: DependencyGroup[];
};

const numberFormatter = new Intl.NumberFormat("nl-NL");

const DependenciesAccordion = ({ groups }: DependenciesAccordionProps) => (
  <div className="dependencies-accordion">
    <AccordionProvider
      headingLevel={5}
      sections={groups.map((group) => ({
        expanded: group.rows.length <= 10,
        label: `${group.title} (${numberFormatter.format(group.rows.length)})`,
        section: true,
        body:
          group.rows.length > 0 ? (
            <div className="dependency-table-wrapper">
              <Table className="dependency-table">
                <TableCaption className="sr-only">{group.title}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell scope="col">Schema</TableHeaderCell>
                    <TableHeaderCell scope="col">Locatie</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.rows.map((dependency) => (
                    <TableRow
                      key={`${dependency.schemaLabel}-${dependency.at}-${dependency.href ?? ""}`}
                    >
                      <TableHeaderCell scope="row">
                        {dependency.href ? (
                          <Link href={dependency.href}>
                            {dependency.schemaLabel}
                          </Link>
                        ) : (
                          dependency.schemaLabel
                        )}
                      </TableHeaderCell>
                      <TableCell>
                        <code>{dependency.at}</code>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <Paragraph>{group.emptyMessage}</Paragraph>
          ),
      }))}
    />
  </div>
);

export default DependenciesAccordion;
