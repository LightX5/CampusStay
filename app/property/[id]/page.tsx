"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Check, Heart, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { AuthModal } from "@/components/auth-modal";
import { Button } from "@/components/button";
import { useApp } from "@/components/app-provider";
import { PropertyGallery } from "@/components/property-gallery";
import { formatPrice, properties } from "@/lib/data";

export default function PropertyPage() {
  const { id } = useParams<{ id: string }>();
  const property = properties.find((item) => item.id === id);
  const { user, isSaved, toggleSaved, addRecent } = useApp();
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    if (property) addRecent(property.id);
  }, [property?.id]);

  if (!property) return <main className="container py-24 text-center"><h1 className="text-2xl font-bold text-[var(--navy)]">Property not found</h1><Link href="/search" className="mt-5 inline-block font-bold text-[var(--orange)]">Back to search</Link></main>;

  const saved = isSaved(property.id);
  const protectSave = () => user ? toggleSaved(property.id) : setAuthOpen(true);

  return (
    <main className="container py-8 md:py-12">
      <Link href="/search" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#697580] hover:text-[var(--navy)]"><ArrowLeft size={16} />Back to search</Link>
      <PropertyGallery images={property.images} name={property.name} />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_350px]">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div><p className="eyebrow">{property.type}</p><h1 className="mt-3 text-3xl font-black tracking-[-.04em] text-[var(--navy)] md:text-4xl">{property.name}</h1><p className="mt-3 flex items-center gap-2 text-sm text-[#697580]"><MapPin size={16} />{property.location}, Ile-Ife <span className="text-[#bdc3c4]">•</span> <Navigation size={16} />{property.distance} km from campus</p></div>
            <div className="text-right"><p className="text-2xl font-black text-[var(--orange)]">{formatPrice(property.price)}</p><p className="text-sm text-[#697580]">per year</p></div>
          </div>
          <div className="mt-10 border-t border-[#dedfd9] pt-8"><h2 className="text-xl font-bold text-[var(--navy)]">About this place</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-[#697580]">{property.description} The space is suited to students looking for a comfortable base with the essentials nearby and a clear, straightforward rental arrangement.</p></div>
          <div className="mt-10 border-t border-[#dedfd9] pt-8"><h2 className="text-xl font-bold text-[var(--navy)]">What&apos;s included</h2><div className="mt-5 flex flex-wrap gap-2">{property.facilities.map((facility) => <span key={facility} className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2.5 text-sm font-semibold text-[#53616a]"><Check size={16} className="text-[var(--orange)]" />{facility}</span>)}</div></div>
          <div className="mt-10 border-t border-[#dedfd9] pt-8"><h2 className="text-xl font-bold text-[var(--navy)]">Location</h2><div className="relative mt-5 flex min-h-56 items-center justify-center overflow-hidden rounded-xl bg-[#e3ebe8]"><div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(#93aba8 1px, transparent 1px), linear-gradient(90deg, #93aba8 1px, transparent 1px)", backgroundSize: "36px 36px" }} /><div className="relative flex flex-col items-center gap-2"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--orange)] text-white shadow-lg"><MapPin size={22} /></span><span className="rounded-md bg-white px-3 py-2 text-xs font-bold text-[var(--navy)] shadow">{property.location}, Ile-Ife</span></div></div><p className="mt-3 text-xs text-[#7b858b]">Map preview for orientation. Exact address is shared after a viewing is arranged.</p></div>
        </div>
        <aside className="h-fit rounded-xl border border-[#e3e4df] bg-white p-6 shadow-soft lg:sticky lg:top-6"><p className="text-sm font-bold text-[var(--navy)]">Interested in this place?</p><p className="mt-2 text-sm leading-6 text-[#697580]">Ask a question or request a viewing directly from the landlord.</p><Button onClick={() => !user && setAuthOpen(true)} className="mt-6 w-full"><Mail size={17} />Contact landlord</Button><Button variant="secondary" onClick={protectSave} className="mt-3 w-full"><Heart size={17} fill={saved ? "currentColor" : "none"} />{saved ? "Saved property" : "Save property"}</Button><div className="mt-6 border-t border-[#ecece8] pt-5 text-xs leading-5 text-[#7b858b]"><p className="flex gap-2"><Phone size={14} className="mt-0.5 shrink-0 text-[var(--orange)]" />You&apos;ll need an account to contact a landlord. It keeps your requests in one place.</p></div></aside>
      </div>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} action="save or contact a landlord" />
    </main>
  );
}
