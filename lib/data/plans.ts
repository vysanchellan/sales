/* ===========================================================================
   Measured drawings.

   One plan per property, authored by hand against the same 340 × 240 field.
   The building sits inside x 44–296, y 44–184; annotation lives outside it.
   Every drawing uses the same four line weights (envelope, partition, glazing,
   site) defined once in globals.css, so ten different buildings read as ten
   sheets from one office.

   Dimensions are consistent with each property's stated floor area — a plan
   that contradicts its own schedule is worse than no plan at all.
   =========================================================================== */

export interface PlanDim {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  t: string;
}

export interface PlanSpec {
  /** Tight viewBox for this drawing, so every sheet fills its frame. */
  box: string;
  /** Sheet title block: what this drawing is. */
  sheet: string;
  /** The cut wall — the heaviest line on the sheet. */
  envelope: string;
  /** Internal structure. */
  partitions?: string[];
  /** Glazing runs, drawn thin and inboard of the wall line. */
  glazing?: string[];
  /** Door swings. */
  swings?: string[];
  /** Everything outside the envelope: terrace, pool, boundary, contour. */
  site?: string[];
  rooms: { t: string; x: number; y: number }[];
  dims: PlanDim[];
}

export const plans: Record<string, PlanSpec> = {
  /* --- Ravello. An 18th-century masonry villa, opened to the sea on its
     southern face by a loggia, with terraces falling away below. ---------- */
  "villa-serena": {
    box: "14 28 272 206",
    sheet: "Piano nobile",
    envelope: "M46,48 H262 V118 H198 V162 H46 Z",
    partitions: ["M128,48 V162", "M46,98 H128", "M128,118 H198", "M198,48 V118"],
    glazing: ["M50,158 H194", "M258,52 V114"],
    swings: [
      "M128,86 A12,12 0 0 1 140,98",
      "M128,130 A12,12 0 0 1 140,142",
    ],
    site: [
      "M34,172 H274 V206 H34 Z",
      "M132,180 H236 V198 H132 Z",
      "M34,40 H274",
    ],
    rooms: [
      { t: "Salon", x: 87, y: 76 },
      { t: "Cucina", x: 87, y: 132 },
      { t: "Primary", x: 163, y: 86 },
      { t: "Bagno", x: 230, y: 86 },
      { t: "Loggia", x: 163, y: 143 },
      { t: "Terrace", x: 76, y: 193 },
      { t: "Pool", x: 184, y: 191 },
    ],
    dims: [
      { x1: 46, y1: 222, x2: 262, y2: 222, t: "26.4 m" },
      { x1: 26, y1: 48, x2: 26, y2: 162, t: "13.8 m" },
    ],
  },

  /* --- Marylebone. A single floor plate. The lift lands inside the plan, so
     the core sits central and the perimeter is entirely glass. ------------ */
  "marylebone-penthouse": {
    box: "14 22 306 206",
    sheet: "Level 08 — whole floor",
    envelope: "M48,50 H292 V182 H48 Z",
    partitions: [
      "M148,92 H196 V140 H148 Z",
      "M148,50 V92",
      "M196,50 V92",
      "M100,140 V182",
      "M244,92 V182",
      "M196,140 H244",
    ],
    glazing: [
      "M52,54 H288",
      "M52,178 H288",
      "M52,54 V178",
      "M288,54 V178",
    ],
    swings: ["M148,128 A12,12 0 0 0 160,140", "M244,128 A12,12 0 0 1 232,140"],
    site: ["M34,36 H306 V196 H34 Z"],
    rooms: [
      { t: "Gallery hall", x: 98, y: 74 },
      { t: "Living", x: 98, y: 118 },
      { t: "Kitchen", x: 172, y: 166 },
      { t: "Primary", x: 268, y: 138 },
      { t: "Lift", x: 172, y: 118 },
      { t: "Terrace", x: 170, y: 44 },
    ],
    dims: [
      { x1: 48, y1: 216, x2: 292, y2: 216, t: "24.6 m" },
      { x1: 26, y1: 50, x2: 26, y2: 182, t: "16.7 m" },
    ],
  },

  /* --- Zollikon. A glass pavilion: two solid service bars holding an
     entirely transparent middle. ------------------------------------------ */
  "glasshouse-on-the-hill": {
    box: "14 32 310 194",
    sheet: "Ground floor",
    envelope: "M44,58 H296 V172 H44 Z",
    partitions: ["M104,58 V172", "M236,58 V172", "M104,116 H44", "M236,116 H296"],
    glazing: ["M108,62 H232", "M108,168 H232"],
    swings: ["M170,168 A14,14 0 0 1 184,182"],
    site: [
      "M30,44 H310 V190 H30 Z",
      "M112,182 H228",
      "M44,196 H296",
    ],
    rooms: [
      { t: "Study", x: 74, y: 86 },
      { t: "Utility", x: 74, y: 146 },
      { t: "Living — dining", x: 170, y: 100 },
      { t: "Kitchen", x: 170, y: 152 },
      { t: "Primary", x: 266, y: 86 },
      { t: "Bath", x: 266, y: 146 },
    ],
    dims: [
      { x1: 44, y1: 214, x2: 296, y2: 214, t: "28.0 m" },
      { x1: 26, y1: 58, x2: 26, y2: 172, t: "10.0 m" },
    ],
  },

  /* --- Lourmarin. A working farm built round a courtyard; the ranges were
     added over two centuries, so the walls are thick and the plan is a ring. */
  "domaine-du-vallon": {
    box: "14 20 310 212",
    sheet: "Ground floor — ranges",
    envelope: "M44,46 H296 V186 H44 Z",
    partitions: [
      "M104,106 H236 V146 H104 Z",
      "M104,46 V106",
      "M236,46 V106",
      "M104,146 V186",
      "M236,146 V186",
      "M170,46 V106",
    ],
    glazing: ["M108,110 H232", "M108,142 H232"],
    swings: ["M170,106 A12,12 0 0 1 182,118"],
    site: ["M30,32 H310 V200 H30 Z", "M30,32 V200"],
    rooms: [
      { t: "Cour", x: 170, y: 130 },
      { t: "Salle", x: 137, y: 78 },
      { t: "Cuisine", x: 203, y: 78 },
      { t: "Chai", x: 74, y: 116 },
      { t: "Cellier", x: 266, y: 116 },
      { t: "Chambres", x: 170, y: 170 },
    ],
    dims: [
      { x1: 44, y1: 220, x2: 296, y2: 220, t: "31.5 m" },
      { x1: 26, y1: 46, x2: 26, y2: 186, t: "17.5 m" },
    ],
  },

  /* --- Positano. A house cut into the cliff: rooms step down, the terrace is
     the roof of the level below. ------------------------------------------ */
  "casa-del-faro": {
    box: "28 30 268 208",
    sheet: "Entry level",
    envelope: "M70,54 H270 V126 H190 V178 H70 Z",
    partitions: ["M130,54 V178", "M130,110 H190", "M190,54 V126"],
    glazing: ["M74,174 H186", "M266,58 V122"],
    swings: ["M130,90 A11,11 0 0 1 141,101"],
    site: [
      "M56,42 H284",
      "M50,188 H206 V212 H50 Z",
      "M40,58 V200",
    ],
    rooms: [
      { t: "Ingresso", x: 100, y: 80 },
      { t: "Soggiorno", x: 100, y: 148 },
      { t: "Cucina", x: 160, y: 82 },
      { t: "Bagno", x: 160, y: 146 },
      { t: "Camera", x: 230, y: 90 },
      { t: "Terrazza", x: 128, y: 200 },
    ],
    dims: [
      { x1: 70, y1: 226, x2: 270, y2: 226, t: "19.2 m" },
      { x1: 52, y1: 54, x2: 52, y2: 178, t: "12.4 m" },
    ],
  },

  /* --- Zollikon lakeside. A long bar turned toward the water, service to the
     road, living to the lake. --------------------------------------------- */
  "lakeview-residence": {
    box: "14 36 310 198",
    sheet: "Ground floor",
    envelope: "M44,62 H296 V166 H44 Z",
    partitions: [
      "M44,110 H296",
      "M124,62 V110",
      "M212,62 V110",
      "M168,110 V166",
    ],
    glazing: ["M48,162 H292"],
    swings: ["M168,150 A12,12 0 0 1 180,162"],
    site: ["M30,178 H310 V204 H30 Z", "M30,48 H310"],
    rooms: [
      { t: "Entry", x: 84, y: 88 },
      { t: "Kitchen", x: 168, y: 88 },
      { t: "Primary", x: 254, y: 88 },
      { t: "Living", x: 106, y: 140 },
      { t: "Dining", x: 232, y: 140 },
      { t: "Lake terrace", x: 170, y: 193 },
    ],
    dims: [
      { x1: 44, y1: 222, x2: 296, y2: 222, t: "26.5 m" },
      { x1: 26, y1: 62, x2: 26, y2: 166, t: "11.0 m" },
    ],
  },

  /* --- Camden. One volume in a 1912 warehouse. The only full-height walls are
     the bathroom and the stair; everything else is furniture. -------------- */
  "the-camden-loft": {
    box: "48 36 240 186",
    sheet: "Loft — single volume",
    envelope: "M78,60 H262 V172 H78 Z",
    partitions: ["M78,128 H132 V172", "M206,60 V104 H262"],
    glazing: ["M82,64 H202", "M258,108 V168"],
    swings: ["M132,150 A11,11 0 0 0 143,161"],
    site: ["M64,48 H276 V184 H64 Z"],
    rooms: [
      { t: "Living — sleeping", x: 172, y: 140 },
      { t: "Kitchen", x: 250, y: 82 },
      { t: "Bath", x: 105, y: 152 },
      { t: "Studio", x: 140, y: 92 },
    ],
    dims: [
      { x1: 78, y1: 210, x2: 262, y2: 210, t: "16.4 m" },
      { x1: 60, y1: 60, x2: 60, y2: 172, t: "11.0 m" },
    ],
  },

  /* --- Olive Ridge. Land, so there is no floor plan: this is the site sheet.
     Boundary, contours at 10 m, the existing track, and the envelope within
     which anything may be built. ------------------------------------------ */
  "olive-ridge-parcel": {
    box: "10 30 306 202",
    sheet: "Site plan — 6.2 ha",
    envelope: "M40,56 L206,42 L302,96 L286,182 L104,192 L40,140 Z",
    partitions: [],
    glazing: [],
    site: [
      "M56,148 C104,126 158,132 214,110 C248,98 268,92 288,96",
      "M52,128 C102,106 156,112 212,90 C246,78 270,72 292,78",
      "M50,108 C100,88 152,94 208,72 C240,60 268,54 296,62",
      "M46,166 C100,146 160,152 218,130 C252,118 270,112 288,118",
      "M40,140 C86,158 140,176 200,178",
      "M148,196 L156,150 L212,140",
    ],
    rooms: [
      { t: "Building envelope", x: 210, y: 118 },
      { t: "Existing track", x: 160, y: 204 },
      { t: "Olive terraces", x: 96, y: 92 },
    ],
    dims: [
      { x1: 40, y1: 220, x2: 302, y2: 220, t: "312 m" },
      { x1: 22, y1: 42, x2: 22, y2: 192, t: "198 m" },
    ],
  },

  /* --- Belgravia. The London townhouse plan: narrow, deep, stair against the
     party wall, front and back rooms linked by a single enfilade. ---------- */
  "the-belgravia-townhouse": {
    box: "86 18 164 218",
    sheet: "Ground floor",
    envelope: "M118,42 H222 V196 H118 Z",
    partitions: [
      "M118,108 H222",
      "M118,150 H222",
      "M186,42 V108",
      "M186,150 V196",
    ],
    glazing: ["M122,46 H182", "M122,192 H182"],
    swings: [
      "M186,96 A12,12 0 0 1 198,108",
      "M186,150 A12,12 0 0 0 198,162",
    ],
    site: ["M104,30 H236 V208 H104 Z", "M104,196 H236"],
    rooms: [
      { t: "Drawing room", x: 152, y: 76 },
      { t: "Stair", x: 204, y: 76 },
      { t: "Dining", x: 170, y: 130 },
      { t: "Kitchen", x: 152, y: 174 },
      { t: "Garden room", x: 204, y: 174 },
    ],
    dims: [
      { x1: 118, y1: 224, x2: 222, y2: 224, t: "8.2 m" },
      { x1: 100, y1: 42, x2: 100, y2: 196, t: "19.5 m" },
    ],
  },

  /* --- Capri. A 1970s villa on the cliff edge: a solid spine to the rock, an
     open face to the drop. ------------------------------------------------- */
  "capri-cliff-villa": {
    box: "22 32 292 198",
    sheet: "Main level",
    envelope: "M52,56 H288 V116 H216 V180 H52 Z",
    partitions: ["M52,116 H216", "M132,56 V116", "M132,116 V180", "M216,56 V116"],
    glazing: ["M56,176 H128", "M136,176 H212", "M284,60 V112"],
    swings: ["M132,104 A12,12 0 0 1 144,116"],
    site: [
      "M38,44 H302",
      "M38,192 C110,206 200,206 268,192",
      "M60,188 H208",
    ],
    rooms: [
      { t: "Ingresso", x: 92, y: 84 },
      { t: "Soggiorno", x: 174, y: 84 },
      { t: "Camera", x: 252, y: 84 },
      { t: "Cucina", x: 92, y: 148 },
      { t: "Loggia", x: 174, y: 148 },
    ],
    dims: [
      { x1: 52, y1: 218, x2: 288, y2: 218, t: "23.6 m" },
      { x1: 34, y1: 56, x2: 34, y2: 180, t: "12.4 m" },
    ],
  },
};

export const getPlan = (slug: string): PlanSpec | undefined => plans[slug];
