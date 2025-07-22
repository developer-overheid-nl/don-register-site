import styles from "./styles.module.css";
import SiteLogo from "../SiteLogo"
import { Heading } from '@rijkshuisstijl-community/components-react';

export default function Header({ titleSite, titlePage }: { titleSite: string, titlePage: string }) {
  return (
    <header className={styles.header}>
      <SiteLogo />
      <Heading level={1} appearance="h3">{titleSite}<span className="sr-only">: {titlePage}</span></Heading>
      {/* Additional header content can go here */}
    </header>
  );
}
