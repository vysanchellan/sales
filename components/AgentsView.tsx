"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Mail, X, ArrowUpRight, MapPin } from "lucide-react";
import { agents } from "@/lib/data/agents";
import { getByAgent, formatPrice } from "@/lib/data/properties";
import type { Agent } from "@/lib/data/types";
import { TiltCard } from "@/components/animations/TiltCard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { EASE } from "@/lib/animations";

export function AgentsView() {
  const [active, setActive] = useState<Agent | null>(null);

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-28 pt-32 md:px-10">
      <div className="mb-14 max-w-2xl">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold/70">The People</p>
        <h1 className="font-display text-4xl text-cloud md:text-6xl">Advisors</h1>
        <p className="mt-4 text-mist">
          A small bench of specialists, each with a deep command of their market. Discretion is not a
          policy here — it is the practice.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {agents.map((agent, i) => (
          <ScrollReveal key={agent.id} delay={i * 0.08}>
            <TiltCard max={7} className="h-full">
              <button
                onClick={() => setActive(agent)}
                className="group relative block h-full w-full overflow-hidden rounded-lg border border-cloud/10 bg-ink-soft text-left"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={agent.photo}
                    alt={agent.name}
                    fill
                    sizes="(max-width:768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  {/* hover reveal panel */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex gap-3 text-xs text-gold-light">
                      <span className="flex items-center gap-1"><Phone size={12} /> Call</span>
                      <span className="flex items-center gap-1"><Mail size={12} /> Email</span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-gold/70">
                    <MapPin size={11} /> {agent.area}
                  </p>
                  <h3 className="mt-1 font-display text-xl text-cloud">{agent.name}</h3>
                  <p className="text-sm text-mist">{agent.title}</p>
                  <p className="mt-3 text-xs text-mist/80">{agent.specialty}</p>
                </div>
              </button>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>

      <AnimatePresence>
        {active && <AgentModal agent={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </div>
  );
}

function AgentModal({ agent, onClose }: { agent: Agent; onClose: () => void }) {
  const listings = getByAgent(agent.id);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-cloud/10 bg-ink-soft"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.4, ease: EASE.outExpo }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-cloud/70 hover:text-cloud"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="grid gap-6 p-6 md:grid-cols-[200px_1fr] md:p-8">
          <Image
            src={agent.photo}
            alt={agent.name}
            width={200}
            height={250}
            className="h-56 w-full rounded-xl object-cover md:h-full"
          />
          <div>
            <p className="text-xs uppercase tracking-wider text-gold/70">{agent.area}</p>
            <h2 className="mt-1 font-display text-3xl text-cloud">{agent.name}</h2>
            <p className="text-mist">{agent.title}</p>
            <p className="mt-4 text-sm leading-relaxed text-cloud/85">{agent.bio}</p>

            <div className="mt-5 flex flex-wrap gap-4 text-sm">
              <a href={`tel:${agent.phone}`} className="flex items-center gap-1.5 text-gold hover:underline">
                <Phone size={14} /> {agent.phone}
              </a>
              <a href={`mailto:${agent.email}`} className="flex items-center gap-1.5 text-gold hover:underline">
                <Mail size={14} /> {agent.email}
              </a>
            </div>
            <p className="mt-3 text-xs text-mist">
              {agent.yearsExperience} years · Speaks {agent.languages.join(", ")}
            </p>
          </div>
        </div>

        <div className="border-t border-cloud/10 p-6 md:p-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-xl text-cloud">
              Active listings ({listings.length})
            </h3>
            <Link
              href={`/listings?agent=${agent.id}`}
              className="flex items-center gap-1 text-sm text-gold hover:underline"
            >
              View all <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {listings.map((p) => (
              <Link
                key={p.id}
                href={`/listings/${p.slug}`}
                className="flex items-center gap-3 rounded-xl border border-cloud/10 p-3 transition-colors hover:border-gold/30"
              >
                <Image
                  src={p.images[0]}
                  alt={p.title}
                  width={64}
                  height={48}
                  className="h-12 w-16 rounded-md object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm text-cloud">{p.title}</p>
                  <p className="text-xs text-gold-light">{formatPrice(p.price, p.status)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
