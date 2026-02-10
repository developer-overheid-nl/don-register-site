import styles from "./styles.module.css";

export default function Logo({
  forced = false,
}: {
  forced?: "light" | "dark" | boolean;
}) {
  return (
    <div
      className={`${styles.logo} ${forced ? styles[`forced-${forced}`] : ""}`}
    >
      YOUR LOGO HERE
    </div>
  );
}
