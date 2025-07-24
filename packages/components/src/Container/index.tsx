import styles from "./styles.module.css";

export default function Container(props: React.HTMLProps<HTMLDivElement>) {
  const { children, className, ...restProps } = props || {};
  return <div className={`${styles.container} ${className}`} {...restProps}>{children}</div>;
}
