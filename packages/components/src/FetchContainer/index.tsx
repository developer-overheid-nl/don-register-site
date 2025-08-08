import Markdown from 'react-markdown'

export default function FetchContainer({ data }: { data: any }) {
  return (
    <div>
      {data ? (
        <>
          <pre hidden>{JSON.stringify(data, null, 2)}</pre>
          {data.apis.map((item: any) => (
            <div key={item.id} style={{ marginBlockEnd: '2rem' }}>
              <h3><a href={`https://redocly.github.io/redoc/?url=${item.oasUrl}`} target="_blank" rel="noopener">{item.title}</a></h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr 3fr)' }}>
                <h4>Organisatie</h4>
                <ul>
                  <li><a href={item.organisation.uri} target="_blank" rel="noopener">{item.organisation.label}</a></li>
                </ul>
                <h4>Contact</h4>
                <ul>
                  <li><a href={item.contact.url} target="_blank" rel="noopener">{item.contact.name}</a></li>
                  <li><a href={`mailto:${item.contact.email}`}>{item.contact.email}</a></li>
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
