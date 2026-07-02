"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EASE, DURATION } from "@/lib/animations";
import { useCoarsePointer } from "@/lib/hooks/useCoarsePointer";

interface Props {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

/**
 * Word-by-word reveal: each word rises out of an overflow clip with a
 * blur-to-sharp transition. Wrap a word in [[double brackets]] to give it the
 * living gradient. On coarse pointers blur is swapped for transform-only.
 */
export function TextReveal({
  text,
  as = "h2",
  className = "",
  delay = 0,
  stagger = 0.06,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: 0.4 });
  const coarse = useCoarsePointer();
  const Tag = motion[as];

  const words = text.split(" ");

  const hidden = coarse
    ? { y: "110%", opacity: 0 }
    : { y: "110%", opacity: 0, filter: "blur(8px)" };
  const shown = { y: "0%", opacity: 1, filter: "blur(0px)" };

  return (
    <Tag
      ref={ref as never}
      className={className}
      aria-label={text.replace(/\[\[|\]\]/g, "")}
    >
      {words.map((word, i) => {
        const gradient = word.startsWith("[[") && word.endsWith("]]");
        const clean = word.replace(/\[\[|\]\]/g, "");
        return (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom mr-[0.26em]"
            style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}
          >
            <motion.span
              className={`inline-block ${gradient ? "living-gradient" : ""}`}
              initial={hidden}
              animate={inView ? shown : hidden}
              transition={{
                duration: DURATION.slow,
                ease: EASE.outExpo,
                delay: delay + i * stagger,
              }}
              aria-hidden
            >
              {clean}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
