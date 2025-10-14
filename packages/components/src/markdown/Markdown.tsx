import React, { type JSX } from "react";
import ReactMarkdown, {type Options, type Components, type ExtraProps } from "react-markdown";
import remarkBehead from 'remark-behead';

export type HeadingLevels = 0 | 1 | 2 | 3 | 4 | 5;
export interface MarkdownProps extends Readonly<Options> { 
  text?: string;
  openLinksInNewTab?: boolean;
  minHeadingDepth?: HeadingLevels;
}

export default function Markdown(options: MarkdownProps) {
  const { children, text, 
    openLinksInNewTab = false, 
    minHeadingDepth = 2,
    ...restOptions 
  } = options;

  const mdText = text || (typeof children === 'string' ? children : '');
  
  const linkAttrs = openLinksInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const components: Components = {
    a: ({node, ...props}) => <a {...props} {...linkAttrs} className="moveAbove" />,
  }

  return <ReactMarkdown 
    children={mdText} 
    components={components} 
    skipHtml={true} 
    unwrapDisallowed={true} /*allowedElements={['p', 'ul', 'ol', 'li']}*/ 
    remarkPlugins={[[remarkBehead, {minDepth: minHeadingDepth}]]}
    {...restOptions} 
  />;
}
