"use client";

import Link from "next/link";
import { Heart, MapPin, Navigation } from "lucide-react";
import { useApp } from "@/components/app-provider";
import { FacilityChip } from "@/components/facility-chip";
import { formatPrice } from "@/lib/data";
import { Property } from "@/lib/types";

export function PropertyCard({ property, onAuthRequired }: { property: Property; onAuthRequired?: () => void }) {
  const { isSaved, toggleSaved, user } = useApp();
  const saved = isSaved(property.id);
  const save = () => { if (!user) onAuthRequired?.(); else toggleSaved(property.id); };
  return (
    <article className="group overflow-hidden rounded-xl border border-[#e3e4df] bg-white transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[1.35/1] overflow-hidden">
        <img src={property.images[0]} alt={property.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[var(--navy)]">{property.type}</div>
        <button onClick={save} aria-label={saved ? "Remove " + property.name + " from saved" : "Save " + property.name} className={"focus-ring absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 transition hover:scale-105 " + (saved ? "text-[var(--orange)]" : "text-[var(--navy)]")}><Heart size={19} fill={saved ? "currentColor" : "none"} /></button>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4"><div><h3 className="text-[17px] font-bold leading-6 text-[var(--navy)]">{property.name}</h3><p className="mt-1 flex items-center gap-1.5 text-sm text-[#697580]"><MapPin size={14} />{property.location}, Ile-Ife</p></div><p className="whitespace-nowrap text-[15px] font-extrabold text-[var(--orange)]">{formatPrice(property.price)}<span className="text-xs font-medium text-[#8c9598]"> / yr</span></p></div>
        <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-[#697580]"><Navigation size={14} />{property.distance} km from campus</p>
        <div className="mt-4 flex flex-wrap gap-1.5">{property.facilities.slice(0, 4).map((facility) => <FacilityChip key={facility}>{facility}</FacilityChip>)}{property.facilities.length > 4 && <FacilityChip>+{property.facilities.length - 4}</FacilityChip>}</div>
        <Link href={"/property/" + property.id} className="focus-ring mt-5 flex min-h-11 w-full items-center justify-center rounded-lg border border-[var(--navy)] text-sm font-bold text-[var(--navy)] transition hover:bg-[var(--navy)] hover:text-white">View property</Link>
      </div>
    </article>
  );
}
