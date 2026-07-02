"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand, Volume2, VolumeX } from "lucide-react";

interface Props {
  images: string[];
  title: string;
  heroVideo?: string;
}

export function Gallery({ images, title, heroVideo }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + images.length) % images.length),
    [images.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go]);

  return (
    <>
      <div className="grid gap-3 md:grid-cols-4 md:grid-rows-2">
        {/* Primary tile — video walkthrough if present, else lead image.
            A div (not a button) so the mute toggle can nest without invalid
            button-in-button markup. */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen(true);
            }
          }}
          className="group relative col-span-4 row-span-2 aspect-[16/10] cursor-pointer overflow-hidden rounded-2xl md:col-span-3"
        >
          {heroVideo ? (
            <video
              className="h-full w-full object-cover"
              src={heroVideo}
              poster={images[0]}
              autoPlay
              muted={muted}
              loop
              playsInline
            />
          ) : (
            <Image
              src={images[0]}
              alt={title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 75vw"
              className="object-cover transition-transform duration-[1.4s] group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          {heroVideo && (
            <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs text-cloud backdrop-blur">
              Virtual walkthrough
            </span>
          )}
          <span className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1.5 text-xs text-cloud backdrop-blur">
            <Expand size={13} /> View gallery
          </span>
          {heroVideo && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMuted((m) => !m);
              }}
              className="absolute bottom-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-cloud backdrop-blur"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
          )}
        </div>

        {images.slice(1, 3).map((img, i) => (
          <button
            key={img}
            onClick={() => {
              setIndex(i + 1);
              setOpen(true);
            }}
            className="group relative hidden aspect-[4/3] overflow-hidden rounded-2xl md:block"
          >
            <Image
              src={img}
              alt={`${title} ${i + 2}`}
              fill
              sizes="25vw"
              className="object-cover transition-transform duration-[1.4s] group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <button
              className="absolute right-5 top-5 text-cloud/70 hover:text-cloud"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <button
              className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-ink/60 text-cloud md:left-8"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-ink/60 text-cloud md:right-8"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                className="relative aspect-[3/2] w-[92vw] max-w-5xl cursor-grab overflow-hidden rounded-xl"
                onClick={(e) => e.stopPropagation()}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  else if (info.offset.x > 80) go(-1);
                }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
              >
                <Image src={images[index]} alt={`${title} ${index + 1}`} fill sizes="90vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-gold" : "w-1.5 bg-cloud/40"
                  }`}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
