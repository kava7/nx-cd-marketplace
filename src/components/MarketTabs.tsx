'use client';

export function MarketTabs<T extends string>({
  activeTab,
  onChange,
  tabs,
}: {
  activeTab: T;
  onChange: (tab: T) => void;
  tabs: Array<{ key: T; label: string }>;
}): JSX.Element {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          className={`rounded-lg border px-4 py-2 text-sm transition-all duration-200 ${
            activeTab === tab.key ? 'border-[#0ECB81]/30 bg-[#0ECB81]/15 text-[#0ECB81]' : 'border-[#2B3139] bg-[#1E2329] text-[#848E9C] hover:text-white'
          }`}
          key={tab.key}
          onClick={() => onChange(tab.key)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
