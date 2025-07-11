import { type FormEvent, useState } from 'react';
import { Button, PrimaryActionButton, Icon, FormFieldTextInput } from '@rijkshuisstijl-community/components-react';
import styles from './styles.module.css';
// TODO: Find a clever way to have your own proprietary icons
// without having to import the whole package.
import IconSearch from '../../../../proprietary/icons/ro/react/IconZoekInline.tsx';

const handleSearchSubmit = (event: FormEvent) => {
  event.preventDefault();
  // setSubmittedSearchTerm(searchTerm);

  // // Announce search results
  // setTimeout(() => {
  //   const resultCount = filterComponents(allComponentsData, searchTerm, selectedFrameworks).length;
  //   if (searchTerm.trim()) {
  //     announceChange(
  //       `Zoekopdracht "${searchTerm}" uitgevoerd. ${resultCount} ${resultCount === 1 ? 'component' : 'componenten'} gevonden.`,
  //     );
  //   }
  // }, 100);

  // if (resultsRef.current) {
  //   resultsRef.current.focus({ preventScroll: true });
  // }
};

const handleSearchChange = (event: FormEvent) => {
  event.preventDefault();
};

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <search aria-labelledby="search-heading" role="search">
      <h2 className="sr-only" id="search-heading">
        Zoeken
      </h2>
      <form className={styles['don-search-form']} onSubmit={handleSearchSubmit}>
        <FormFieldTextInput
          aria-describedby="search-help"
          className={styles['don-search-form__label']}
          id="componentSearchInput"
          label="Voer een zoekterm in"
          name="q"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="sr-only" id="search-help">
          Zoek in componentnamen en beschrijvingen. Druk op Enter om te zoeken.
        </div>
        <PrimaryActionButton aria-label="Zoeken" className={styles['don-search-button']} type="submit">
          <Icon>
            <IconSearch />
          </Icon>
        </PrimaryActionButton>
      </form>
    </search>
  );
};
