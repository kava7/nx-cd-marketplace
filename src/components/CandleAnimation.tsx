export function CandleAnimation(): JSX.Element {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden market-grid opacity-70">
      {Array.from({ length: 8 }, (_, index) => (
        <span
          className="absolute w-2 rounded-full bg-[#0ECB81]/50"
          key={index}
          style={{
            height: `${40 + index * 8}px`,
            left: `${8 + index * 12}%`,
            top: `${18 + (index % 3) * 18}%`,
            animation: `float ${4 + index * 0.4}s ease-in-out infinite`,
            background: index % 2 === 0 ? '#0ECB81' : '#F6465D',
            opacity: 0.22,
          }}
        />
      ))}
    </div>
  );
}
