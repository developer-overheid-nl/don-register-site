import { Footer as RHCFooter } from "@rijkshuisstijl-community/components-react";
import styles from "./styles.module.css";

const Footer = () => {
  return (
    <RHCFooter className={styles.footer} background="primary-outlined" preFooter>
      © 2025 developer.overheid.nl.
    </RHCFooter>
  );
};

export default Footer;
