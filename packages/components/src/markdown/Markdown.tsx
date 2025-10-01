import ReactMarkdown, {type Options, type Components } from "react-markdown";

export default function Markdown(options: Readonly<Options> & { text?: string, openLinksInNewTab?: boolean } & React.HTMLAttributes<HTMLElement>) {
  const { children, text, openLinksInNewTab = false, ...restOptions } = options;

  const mdText = text || (typeof children === 'string' ? children : '');
  
  const linkAttrs = openLinksInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const components: Components = {
    a: ({node, ...props}) => <a {...props} {...linkAttrs} className="moveAbove" />,
  }

  return <ReactMarkdown children={mdText} components={components} {...restOptions} />;
}
