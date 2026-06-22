'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function ImageCarousel({ alt, images }: { alt: string; images: string[] }): JSX.Element {
  const [index, setIndex] = useState(0);
  const hasMany = images.length > 1;
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#2B3139] bg-[#2B3139]">
      <Image alt={alt} className="object-cover" fill src={images[index]} />
      {hasMany ? (
        <>
          <button aria-label="上一张" className="absolute left-3 top-1/2 rounded-full bg-black/50 p-2 text-white" onClick={() => setIndex((index - 1 + images.length) % images.length)} type="button">
            <ChevronLeft />
          </button>
          <button aria-label="下一张" className="absolute right-3 top-1/2 rounded-full bg-black/50 p-2 text-white" onClick={() => setIndex((index + 1) % images.length)} type="button">
            <ChevronRight />
          </button>
        </>
      ) : null}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {images.map((image, dotIndex) => (
          <span className={`h-2 w-2 rounded-full ${dotIndex === index ? 'bg-[#0ECB81]' : 'bg-white/40'}`} key={image} />
        ))}
      </div>
    </div>
  );
}
