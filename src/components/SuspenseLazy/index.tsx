
import { Suspense, lazy } from 'react';
import { SpinnerFullScreen } from '@/components';

interface ISuspense {
  path: Promise<any>
}

export function SuspenseLazy({
  path
}: ISuspense) {
  const LazyComponent = lazy(() => path);
  return (
    <Suspense fallback={<SpinnerFullScreen/>}>
      <LazyComponent/>
    </Suspense>
  );
}
