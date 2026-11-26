import {
  AccordionProvider,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@developer-overheid-nl/don-register-components";

type Project = {
  packageManager: string;
  definitionFile: string;
  directDependencyCount: number;
  transitiveDependencyCount: number;
};

type BundledProjects = {
  packageManager: string;
  projects: Project[];
};

/** Groups projects by package manager, in order of first appearance. */
const bundleProjects = (projects: Project[] = []): BundledProjects[] => {
  const bundles = new Map<string, Project[]>();

  for (const project of projects) {
    const bundle = bundles.get(project.packageManager);
    if (bundle) {
      bundle.push(project);
    } else {
      bundles.set(project.packageManager, [project]);
    }
  }

  return Array.from(bundles, ([packageManager, projects]) => ({
    packageManager,
    projects,
  }));
};

export const ProjectsAccordion = ({ projects }: { projects?: Project[] }) => (
  <AccordionProvider
    sections={bundleProjects(projects).map((bundle) => ({
      label: (
        <>
          <span>{bundle.packageManager}</span>
          &nbsp;&middot;&nbsp;
          <small>{/*TODO:*/ `${bundle.projects.length} bestanden`}</small>
        </>
      ),
      body: (
        <Table className="project-bundle-table">
          <TableCaption className="sr-only">{`Packagemanager ${bundle.packageManager}, gesorteerd op Direct`}</TableCaption>
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
            {[...bundle.projects]
              .sort((a, b) => b.directDependencyCount - a.directDependencyCount)
              .map((project) => (
                <TableRow
                  className="utrecht-table__row"
                  key={project.definitionFile}
                >
                  <TableHeaderCell scope="row">
                    {project.definitionFile}
                  </TableHeaderCell>
                  <TableCell alignCell="end">
                    {project.directDependencyCount}
                  </TableCell>
                  <TableCell alignCell="end">
                    {project.transitiveDependencyCount}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ),
    }))}
  />
);
