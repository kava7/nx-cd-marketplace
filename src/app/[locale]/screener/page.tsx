import scanResults from '@/data/scan-results.json';
import { ScreenerPageClient } from '@/components/ScreenerPageClient';

export default function ScreenerPage(): JSX.Element {
  return <ScreenerPageClient initialSignals={scanResults} />;
}
