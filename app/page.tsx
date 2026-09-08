"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Compass, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { AuthModal } from "@/components/auth-modal";
import { PropertyCard } from "@/components/property-card";
import { SearchBar } from "@/components/search-bar";
import { locations, properties } from "@/lib/data";

const areaPhotos = [
  "photo-1600585154340-be6161a56a0c",
  "photo-1600566753190-17f0baa2a6c3",
  "photo-1600607688969-a5bfcd646154",
  "photo-1600585154526-990dced4db0d",
  "photo-1600607687939-ce8a6c25118c",
];

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);
  const featured = properties.filter((property) => property.featured).slice(0, 6);
  return (
    <>
      <main>
        <section className="overflow-hidden bg-[var(--navy)]">
          <div className="container grid gap-12 py-20 md:grid-cols-[1.05fr_.95fr] md:items-center md:py-28">
            <div>
              <p className="eyebrow">Student living, made simpler</p>
              <h1 className="mt-5 max-w-xl text-5xl font-black leading-[1.04] tracking-[-.055em] text-white md:text-[64px]">Find a place you&apos;ll love to live in.</h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-[#cfdae0] md:text-lg">Discover student-friendly accommodation near your campus, within your budget and with the facilities that matter to you.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/search" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[var(--orange)] px-5 text-sm font-bold text-white hover:bg-[#df6410]">Find accommodation <ArrowRight size={17} /></Link>
                <Link href="/how-it-works" className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-[#557086] px-5 text-sm font-bold text-white hover:bg-[#1d4666]">How it works</Link>
              </div>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-xl border border-[#45637a] bg-[#1b435e] shadow-2xl">
                <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85" alt="Bright student apartment living room" className="aspect-[1.08/1] w-full object-cover opacity-90" />
                <div className="absolute bottom-5 left-5 right-5 rounded-lg bg-white p-4 shadow-xl"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-wide text-[var(--orange)]">Good to know</p><p className="mt-1 text-sm font-bold text-[var(--navy)]">1,200+ students have found a place</p></div><Sparkles size={20} className="text-[var(--orange)]" /></div></div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative z-10 -mt-7"><div className="container"><div className="rounded-xl border border-[#e3e4df] bg-[var(--cream)] p-3 shadow-soft md:p-4"><div className="mb-4 flex items-center justify-between px-2"><div><p className="text-lg font-bold text-[var(--navy)]">Start your search</p><p className="mt-1 text-sm text-[#697580]">Find a better fit in a few clicks.</p></div><Compass className="hidden text-[var(--orange)] sm:block" size={24} /></div><SearchBar /></div></div></section>
        <section className="container py-20 md:py-28"><div className="flex items-end justify-between gap-4"><div><p className="eyebrow">Explore by area</p><h2 className="mt-3 text-3xl font-black tracking-[-.04em] text-[var(--navy)]">Popular student areas</h2></div><Link href="/search" className="hidden items-center gap-2 text-sm font-bold text-[var(--orange)] sm:flex">View all areas <ArrowRight size={16} /></Link></div><div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5">{locations.map((location, index) => <Link key={location} href={"/search?location=" + encodeURIComponent(location)} className="group relative min-h-32 overflow-hidden rounded-xl bg-[var(--navy)] p-5 text-white"><img src={"https://images.unsplash.com/" + areaPhotos[index] + "?auto=format&fit=crop&w=700&q=80"} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45 transition duration-500 group-hover:scale-105 group-hover:opacity-60" /><span className="relative flex h-full flex-col justify-end"><span className="text-base font-bold">{location}</span><span className="mt-1 text-xs text-[#e3ecef]">Browse homes <ArrowRight size={13} className="inline" /></span></span></Link>)}</div></section>
        <section className="bg-white py-20 md:py-28"><div className="container"><div className="flex items-end justify-between gap-4"><div><p className="eyebrow">Handpicked for you</p><h2 className="mt-3 text-3xl font-black tracking-[-.04em] text-[var(--navy)]">Featured accommodation</h2><p className="mt-3 text-sm text-[#697580]">A few places worth seeing around Ile-Ife.</p></div><Link href="/search" className="hidden items-center gap-2 text-sm font-bold text-[var(--orange)] sm:flex">See all listings <ArrowRight size={16} /></Link></div><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{featured.map((property) => <PropertyCard key={property.id} property={property} onAuthRequired={() => setAuthOpen(true)} />)}</div></div></section>
        <section className="container py-20 md:py-28"><div className="grid gap-8 border-y border-[#dedfd9] py-10 md:grid-cols-3">{[[ShieldCheck, "Listings you can trust", "Clear details, useful photos and practical information to help you compare."], [Compass, "Search around your routine", "Sort by distance and find a home that makes campus life easier."], [CheckCircle2, "Built for student budgets", "See the annual price upfront and filter for what works for you."]].map(([Icon, title, text]) => <div key={title as string} className="flex gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#fff0e8] text-[var(--orange)]"><Icon size={21} /></span><div><h3 className="font-bold text-[var(--navy)]">{title as string}</h3><p className="mt-2 text-sm leading-6 text-[#697580]">{text as string}</p></div></div>)}</div></section>
      </main>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} action="save a property" />
    </>
  );
}
