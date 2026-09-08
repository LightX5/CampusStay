"use client";
import Link from "next/link";
import { Bookmark, ArrowRight } from "lucide-react";
import { properties } from "@/lib/data";
import { PropertyCard } from "@/components/property-card";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/button";
import { useApp } from "@/components/app-provider";
import { AuthModal } from "@/components/auth-modal";
import { useState } from "react";

export default function SavedPage() { const { savedIds, user } = useApp(); const [authOpen, setAuthOpen] = useState(!user); const saved = properties.filter((property) => savedIds.includes(property.id)); return <main className="container min-h-[650px] py-14 md:py-20"><div className="flex items-end justify-between gap-4"><div><p className="eyebrow">Your shortlist</p><h1 className="mt-3 text-4xl font-black tracking-[-.05em] text-[var(--navy)]">Saved properties</h1><p className="mt-3 text-sm text-[#697580]">Keep the places you want to compare close by.</p></div><Bookmark className="hidden text-[var(--orange)] sm:block" size={30} /></div>{user ? saved.length ? <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{saved.map((property) => <PropertyCard key={property.id} property={property} onAuthRequired={() => setAuthOpen(true)} />)}</div> : <div className="mt-10"><EmptyState saved title="No saved properties yet" message="Save accommodation you like and come back to compare your options." action={<Link href="/search"><Button>Find accommodation <ArrowRight size={16} /></Button></Link>} /></div> : <div className="mt-10"><EmptyState saved title="Log in to see your saved properties" message="Create an account to keep a shortlist of places while you search." action={<div className="flex gap-3"><Button onClick={() => setAuthOpen(true)}>Log in</Button><Link href="/signup"><Button variant="secondary">Sign up</Button></Link></div>} /></div>}<AuthModal open={authOpen && !user} onClose={() => setAuthOpen(false)} action="view your saved properties" /></main>; }
