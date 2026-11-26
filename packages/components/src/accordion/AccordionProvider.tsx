import {
  AccordionProvider as RhcAccordionProvider,
  type AccordionProviderProps as RhcAccordionProviderProps,
} from "@rijkshuisstijl-community/accordion-react/no-side-effects";
import type { ComponentProps, ReactNode } from "react";

type RhcSection = RhcAccordionProviderProps["sections"][number];

/**
 * A single accordion section. Identical to the upstream section props, except
 * that `label` accepts any `ReactNode`. Upstream types it as `string`, but it
 * is rendered as children of the button, so elements work at runtime.
 */
export type AccordionSectionProps = Omit<RhcSection, "label"> & {
  label: ReactNode;
};

export type AccordionProviderProps = Omit<
  RhcAccordionProviderProps,
  "sections"
> & {
  sections: AccordionSectionProps[];
};

/**
 * Accordion that renders a list of sections from data.
 * Wraps the Rijkshuisstijl Community `AccordionProvider` to widen the type of
 * `label` from `string` to `ReactNode`.
 */
export const AccordionProvider = (props: AccordionProviderProps) => (
  <RhcAccordionProvider
    {...props}
    // Upstream types `label` as `string`; it renders any ReactNode.
    sections={
      props.sections as ComponentProps<typeof RhcAccordionProvider>["sections"]
    }
  />
);
