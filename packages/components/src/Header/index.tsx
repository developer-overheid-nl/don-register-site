import styles from "./styles.module.css";
import SiteLogo from "../SiteLogo"
import { Heading, Link } from '@rijkshuisstijl-community/components-react';
import { Lint } from "../../../../proprietary";
import { IconDeltaNaarLinksInline } from "../../../../proprietary/icons";

interface HeaderProps {
  titleSite: string;
  titlePage: string;
  urlCurrent?: string;
}

export default function Header({ titleSite, titlePage, urlCurrent }: HeaderProps) {
  return (
    <header className={styles.header}>
      <nav aria-label="Naar dit domein"><SiteLogo urlCurrent={urlCurrent} /></nav>
      <Lint className={styles.lint} />
      <div className={styles.title}>
        <Heading level={1} appearanceLevel={3} className={styles.heading}>{titleSite}<span className="sr-only">: {titlePage}</span></Heading>
        <nav aria-label="Naar Hoofddomein"><Link href="#" className={styles.link}><IconDeltaNaarLinksInline className={styles.icon} /> Terug naar developer.overheid.nl</Link></nav>
      </div>
    </header>
  );
}
