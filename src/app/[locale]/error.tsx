'use client';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }): JSX.Element {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold text-white">Error</h1>
      <p className="mt-3 text-[#848E9C]">{error.message}</p>
      <button className="mt-6 rounded-lg bg-[#0ECB81] px-5 py-3 font-medium text-white" onClick={reset} type="button">
        Retry
      </button>
    </main>
  );
}
