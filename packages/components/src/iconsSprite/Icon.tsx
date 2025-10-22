export default function Icon(props: React.HTMLProps<SVGSVGElement>) {
  const { className, name, ...restProps } = props;
  const iconClassName = `don-icon don-icon-${name} ${className || ""}`.trim();

  return (
    <svg
      width="1rem"
      height="1rem"
      className={`${iconClassName}`}
      role={props.role || "img"}
      aria-label={props["aria-label"]}
      {...restProps}
    >
      <use href={`#icon-${name}`} />
    </svg>
  );
}
