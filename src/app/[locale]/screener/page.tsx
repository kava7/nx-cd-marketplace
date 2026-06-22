import scanResultsUs4h from '@/data/scan-results-us-4h.json';
import scanResultsUsDaily from '@/data/scan-results-us-daily.json';
import scanResultsUsWeekly from '@/data/scan-results-us-weekly.json';
import scanResultsJp4h from '@/data/scan-results-jp-4h.json';
import scanResultsJpDaily from '@/data/scan-results-jp-daily.json';
import scanResultsJpWeekly from '@/data/scan-results-jp-weekly.json';
import scanResultsHk4h from '@/data/scan-results-hk-4h.json';
import scanResultsHkDaily from '@/data/scan-results-hk-daily.json';
import scanResultsHkWeekly from '@/data/scan-results-hk-weekly.json';
import type { ScanResult } from '@/components/ScreenerPageClient';
import { ScreenerPageClient } from '@/components/ScreenerPageClient';

const signalMap: Record<string, ScanResult[]> = {
  'us-4h': scanResultsUs4h,
  'us-daily': scanResultsUsDaily,
  'us-weekly': scanResultsUsWeekly,
  'jp-4h': scanResultsJp4h,
  'jp-daily': scanResultsJpDaily,
  'jp-weekly': scanResultsJpWeekly,
  'hk-4h': scanResultsHk4h,
  'hk-daily': scanResultsHkDaily,
  'hk-weekly': scanResultsHkWeekly,
};

export default function ScreenerPage(): JSX.Element {
  return <ScreenerPageClient signalMap={signalMap} />;
}
