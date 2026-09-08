"use client";

import { useState } from "react";

export function PropertyGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-3 md:grid-cols-[1.45fr_1fr]">
      <div className="relative aspect-[1.25/1] overflow-hidden rounded-xl bg-[#d9deda] md:aspect-auto md:min-h-[440px]"><img src={images[active]} alt={name + " interior"} className="absolute inset-0 h-full w-full object-cover" /></div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-1">{images.slice(0, 3).map((image, index) => <button key={image} onClick={() => setActive(index)} className={"focus-ring relative min-h-[120px] overflow-hidden rounded-xl " + (active === index ? "ring-4 ring-[var(--orange)] ring-offset-2" : "")}><img src={image} alt={name + " view " + (index + 1)} className="absolute inset-0 h-full w-full object-cover" /></button>)}</div>
    </div>
  );
}
