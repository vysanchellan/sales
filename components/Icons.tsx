/* ===========================================================================
   The legend.

   These are not pictograms — they are the symbols an architect would actually
   put on a drawing. A bed in plan is a rectangle with a pillow line. A bath is
   a rounded tub with its outlet. Area is the surveyor's extents marker. Year is
   the level datum triangle. Location is a survey station.

   One grammar throughout: a 24 unit field, 1.25 stroke, butt caps, mitred
   joins, no fills. Identical weight to `.plan-glazing`, so an icon sitting
   beside a drawing belongs to it.
   =========================================================================== */

interface IconProps {
  size?: number;
  className?: string;
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "butt" as const,
  strokeLinejoin: "miter" as const,
  "aria-hidden": true,
});

/** Bed, in plan: mattress with the pillow line struck across the head. */
export const IconBed = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="6" width="18" height="13" />
    <path d="M3 10.5h18" />
  </svg>
);

/** Bath, in plan: tub within its enclosure, outlet at the tap end. */
export const IconBath = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="5" width="18" height="14" />
    <rect x="5.5" y="7.5" width="13" height="9" rx="3.2" />
    <circle cx="8.4" cy="12" r="0.9" />
  </svg>
);

/** Area: the surveyor's extents marker — four corner ticks, nothing between. */
export const IconExtent = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 8.5V4h4.5M15.5 4H20v4.5M20 15.5V20h-4.5M8.5 20H4v-4.5" />
  </svg>
);

/** Year built: the level datum — a triangle bearing on its reference line. */
export const IconDatum = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 16h16" />
    <path d="M8 8.5h8L12 16z" />
  </svg>
);

/** Location: a survey station — circle on crossed sight lines. */
export const IconSurvey = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="4.25" />
    <path d="M12 3.5v3.25M12 17.25v3.25M3.5 12h3.25M17.25 12h3.25" />
  </svg>
);

export const IconChevron = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M6.5 9.75 12 15.25l5.5-5.5" />
  </svg>
);

export const IconClose = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
  </svg>
);

/** The open/close control on a drawer. A cross that becomes a rule. */
export const IconCross = ({
  size = 20,
  className,
  open = false,
}: IconProps & { open?: boolean }) => (
  <svg {...base(size)} className={className}>
    <path d="M4 12h16" />
    <path
      d="M12 4v16"
      style={{
        transformOrigin: "12px 12px",
        transform: open ? "rotate(90deg) scaleY(0)" : "none",
        transition: "transform 480ms cubic-bezier(0.22,1,0.36,1)",
      }}
    />
  </svg>
);

export const IconArrow = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M5 19 19 5" />
    <path d="M8.5 5H19v10.5" />
  </svg>
);

export const IconArrowRight = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 12h15" />
    <path d="M13.5 6.5 19 12l-5.5 5.5" />
  </svg>
);

export const IconCheck = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M5 12.5 9.75 17 19 7.5" />
  </svg>
);

/** Two rules. A drawing's menu, not a hamburger. */
export const IconMenu = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M3 9h18M3 15h18" />
  </svg>
);

/** Filter: the drafting adjustment symbol — sliders on their reference lines. */
export const IconFilter = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M3 8h18M3 16h18" />
    <path d="M9 5.5v5M16 13.5v5" />
  </svg>
);
