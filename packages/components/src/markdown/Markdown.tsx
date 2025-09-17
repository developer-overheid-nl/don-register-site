import ReactMarkdown, {type Options } from "react-markdown";

export default function Markdown(options: Readonly<Options> & { text?: string }) {
  const { children, text, ...restOptions } = options;
  const mdText = text || (typeof children === 'string' ? children : '');

  return <ReactMarkdown children={mdText} {...restOptions} />;
}
