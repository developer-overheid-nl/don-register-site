import { useStore } from '@nanostores/react';
import { dataStore } from '../store';

export default function FetchContainer() {
  const $data = useStore(dataStore);

  return (
    <>
      {
        JSON.stringify($data)
      }
    </>
  );
}