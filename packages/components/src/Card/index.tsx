import { use, Suspense, useMemo } from "react";
import { useTranslation, type UseTranslationOptions } from "react-i18next";

const fetchTest = () => {
  console.log('Fetching test data...');
  return useMemo(() => Promise.resolve({
    test: 'Test Title from fetch',
  }), []);
}

function useTest() {
  return useMemo(() => useTranslation(), []);
}

export default function Card ({ test }: { test: string }) {
  const data = use(fetchTest());
  // const t = use(useTest<UseTranslationOptions<undefined>>());

  return (
    <div className="rhc-card">
      <h2>{data?.test || test}</h2>
    </div>
  );
}

function CardFallback() {
  return (
    <div className="rhc-card">
      <h2>Loading...</h2>
    </div>
  );
}

/*export default*/ function SuspenseCard() {
  return (
    <Suspense fallback={<CardFallback />}>
      <Card test="Test Title" />
    </Suspense>
  )
}