import { Markdown } from "@developer-overheid-nl/don-register-components";
import { AccordionProvider } from "@rijkshuisstijl-community/accordion-react/no-side-effects";

type SkillContentAccordionProps = {
  /** SKILL.md content without frontmatter. */
  content: string;
  label: string;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
};

/** The full SKILL.md in an accordion section that is collapsed by default. */
const SkillContentAccordion = ({
  content,
  label,
  headingLevel = 4,
}: SkillContentAccordionProps) => (
  <div className="skill-content-accordion">
    <AccordionProvider
      headingLevel={headingLevel}
      sections={[
        {
          expanded: false,
          label,
          section: true,
          body: (
            <div className="skill-content utrecht-html">
              <Markdown text={content} minHeadingDepth={5} openLinksInNewTab />
            </div>
          ),
        },
      ]}
    />
  </div>
);

export default SkillContentAccordion;
