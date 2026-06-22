import Link from 'next/link';

export default function RootPage(): JSX.Element {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B0E11] p-6 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold">NX/CD Marketplace</h1>
        <div className="mt-6 flex justify-center gap-3">
          <Link className="rounded-lg bg-[#0ECB81] px-5 py-3 font-medium" href="/zh">
            中文
          </Link>
          <Link className="rounded-lg border border-[#2B3139] px-5 py-3 font-medium" href="/en">
            English
          </Link>
        </div>
      </div>
    </main>
  );
}
