import { use } from "react";
import { fetchAPI } from "../fetch";
import Markdown from 'react-markdown'
import { useStore } from '@nanostores/react';
import { test } from '../apiStore';

//const data = await fetch(`https://api.don.apps.digilab.network/api-register/v1/apis`, {
const data = await fetch(`https://gist.githubusercontent.com/dvh/ceba3e787ddb80e53c345afdb0c74b44/raw`, {
  // headers: {
  //   'x-api-key': '153ede87-7c4c-4f22-99b2-d718423dd18d',
  // },
}).then((response) => response.json());

//const $test = useStore(test);
console.log('FetchContainer data:', data, 'from store:', test.get());

export default function FetchContainer({ url, apiKey }: { url: string, apiKey: string }) {
  // const data = use(fetchAPI(url, apiKey));

  return (
    <div>
      {data ? (
        <>
        <pre hidden>{JSON.stringify(data, null, 2)}</pre>
        {data.apis.map((item: any) => (
          <div key={item.id} style={{marginBlockEnd: '2rem'}}>
            <h3><a href={`https://redocly.github.io/redoc/?url=${item.oasUrl}`} target="_blank" rel="noopener">{item.title}</a></h3>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr 3fr)'}}>
            <h4>Organisatie</h4>
            <ul>
              <li><a href={item.organisation.uri} target="_blank" rel="noopener">{item.organisation.label}</a></li>
            </ul>
            <h4>Contact</h4>
            <ul>
              <li><a href={item.contact.url} target="_blank" rel="noopener">{item.contact.name}</a></li>
              <li><a href={item.contact.email}>{item.contact.email}</a></li>
            </ul>
            </div>
            <h4>Beschrijving:</h4>
            <Markdown>{item.description}</Markdown>
          </div>
        ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
