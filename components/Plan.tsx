"use client";

import { motion } from "framer-motion";
import type { PlanSpec, PlanDim } from "@/lib/data/plans";
import { usePrefersReducedMotion } from "@/lib/hooks/useReducedMotion";

/* ===========================================================================
   The drawing draws itself — in the order it would actually be made.

   Structure first, then partitions, then glazing, then the swings, then the
   site, and the annotation last. A draughtsman never dimensions a drawing
   before the walls are on the sheet, and neither does this.

   This is one of the two pieces of motion on the site. It earns its place
   because it is not an entrance effect: it is the content arriving in the
   order that content is made.
   =========================================================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

// When the drawing starts each layer, in seconds.
const CUE = {
  envelope: 0,
  partitions: 0.34,
  glazing: 0.62,
  swings: 0.78,
  site: 0.5,
  labels: 0.95,
  dims: 1.12,
};

function Stroke({
  d,
  cls,
  delay,
  dur,
  draw,
}: {
  d: string;
  cls: string;
  delay: number;
  dur: number;
  draw: boolean;
}) {
  if (!draw) return <path d={d} className={cls} />;
  return (
    <motion.path
      d={d}
      className={cls}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        pathLength: { duration: dur, delay, ease: EASE },
        opacity: { duration: 0.01, delay },
      }}
    />
  );
}

/** A dimension string: rule, 45° ticks, figure. Horizontal or vertical only. */
function Dimension({
  dim,
  delay,
  draw,
}: {
  dim: PlanDim;
  delay: number;
  draw: boolean;
}) {
  const { x1, y1, x2, y2, t } = dim;
  const horizontal = y1 === y2;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;

  // The architect's tick: a short 45° stroke through each terminus.
  const tick = (x: number, y: number) =>
    `M${x - 2.6},${y + 2.6} L${x + 2.6},${y - 2.6}`;

  const body = (
    <>
      <path d={`M${x1},${y1} L${x2},${y2}`} className="plan-dim" />
      <path d={tick(x1, y1)} className="plan-dim" />
      <path d={tick(x2, y2)} className="plan-dim" />
      {horizontal ? (
        <text x={mx} y={y1 - 5} textAnchor="middle" className="plan-dim-text">
          {t}
        </text>
      ) : (
        <text
          x={x1 - 5}
          y={my}
          textAnchor="middle"
          className="plan-dim-text"
          transform={`rotate(-90 ${x1 - 5} ${my})`}
        >
          {t}
        </text>
      )}
    </>
  );

  if (!draw) return <g>{body}</g>;
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {body}
    </motion.g>
  );
}

export function Plan({
  spec,
  title,
  draw = false,
  className = "",
}: {
  spec: PlanSpec;
  /** Property name — used to describe the drawing to assistive tech. */
  title: string;
  draw?: boolean;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const animate = draw && !reduced;

  const rooms = spec.rooms.map((r) => r.t).join(", ");
  const dims = spec.dims.map((d) => d.t).join(" by ");

  // Normalise annotation size against a 300-unit reference sheet, so every
  // drawing's labels land at the same size on screen whatever its frame.
  const boxWidth = Number(spec.box.split(/\s+/)[2]) || 300;

  return (
    <svg
      viewBox={spec.box}
      className={`plan w-full ${className}`}
      /* A townhouse sheet is tall and narrow by nature; cap it so a deep plan
         cannot push the schedule beside it off the screen. */
      style={{ ["--pscale" as string]: boxWidth / 300, maxHeight: "clamp(300px, 58vh, 560px)" }}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Measured plan of ${title}. ${spec.sheet}. Overall ${dims}. Rooms shown: ${rooms}.`}
    >
      {/* Site — the ground the building sits on. It fades rather than draws:
          animating pathLength would override the dashed stroke that marks it
          as outside the envelope, and the ground was already there anyway. */}
      {spec.site?.map((d, i) =>
        animate ? (
          <motion.path
            key={`s${i}`}
            d={d}
            className="plan-site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.42 }}
            transition={{ duration: 0.7, delay: CUE.site + i * 0.06, ease: EASE }}
          />
        ) : (
          <path key={`s${i}`} d={d} className="plan-site" />
        )
      )}

      {/* Structure */}
      <Stroke
        d={spec.envelope}
        cls="plan-wall"
        delay={CUE.envelope}
        dur={1.15}
        draw={animate}
      />

      {spec.partitions?.map((d, i) => (
        <Stroke
          key={`p${i}`}
          d={d}
          cls="plan-partition"
          delay={CUE.partitions + i * 0.07}
          dur={0.5}
          draw={animate}
        />
      ))}

      {spec.glazing?.map((d, i) => (
        <Stroke
          key={`g${i}`}
          d={d}
          cls="plan-glazing"
          delay={CUE.glazing + i * 0.06}
          dur={0.42}
          draw={animate}
        />
      ))}

      {spec.swings?.map((d, i) => (
        <Stroke
          key={`w${i}`}
          d={d}
          cls="plan-swing"
          delay={CUE.swings + i * 0.05}
          dur={0.34}
          draw={animate}
        />
      ))}

      {/* Room names */}
      {spec.rooms.map((r, i) =>
        animate ? (
          <motion.text
            key={`r${i}`}
            x={r.x}
            y={r.y}
            textAnchor="middle"
            className="plan-room-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.45, delay: CUE.labels + i * 0.05 }}
          >
            {r.t}
          </motion.text>
        ) : (
          <text
            key={`r${i}`}
            x={r.x}
            y={r.y}
            textAnchor="middle"
            className="plan-room-text"
          >
            {r.t}
          </text>
        )
      )}

      {/* Annotation last */}
      {spec.dims.map((d, i) => (
        <Dimension
          key={`d${i}`}
          dim={d}
          delay={CUE.dims + i * 0.12}
          draw={animate}
        />
      ))}

    </svg>
  );
}
