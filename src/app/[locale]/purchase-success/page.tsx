import { Suspense } from 'react';

import { PurchaseSuccessClient } from '@/components/PurchaseSuccessClient';

export default function PurchaseSuccessPage(): JSX.Element {
  return (
    <Suspense fallback={null}>
      <PurchaseSuccessClient />
    </Suspense>
  );
}
