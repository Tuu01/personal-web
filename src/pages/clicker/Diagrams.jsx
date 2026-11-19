// Two quick-read diagrams for the clicker case study: a simplified cut-away
// of the parts, and the print-fit-measure loop. Colours come from the site
// tokens, so both work in light and dark. Cobalt marks the one bought part,
// the switch.

const PARTS = [
  ["Head = keycap", "Pulls off to swap the face. Ø32 × 20 mm."],
  ["Black ring with keyring lug", "Prints with the head as one object, in two filaments. No glue."],
  ["Guide wall", "Keeps the head from rocking through its travel."],
  ["Mechanical switch", "A real Cherry MX-compatible switch: the click, 4 mm of travel."],
  ["Mounting plate and ledge", "The switch clips into a 14 × 14 mm cut and rests on a ledge, so presses load the body, not the clips."],
  ["Feather skirt", "Part of the body print: the shuttlecock look."],
];

const Badge = ({ n, x, y, to }) => (
  <g>
    <line x1={x} y1={y} x2={to[0]} y2={to[1]} stroke="var(--muted)" strokeWidth="1" />
    <circle cx={to[0]} cy={to[1]} r="2" fill="var(--muted)" />
    <circle cx={x} cy={y} r="10" fill="var(--ink)" />
    <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--paper)">
      {n}
    </text>
  </g>
);

export const CutAway = () => {
  // 4 px per mm; the assembly is 55.8 wide and 60.8 tall.
  const feathers = [1, 2, 3, 4, 5].map((i) => [124 + (i * 152) / 6, 88 + (i * 224) / 6]);
  return (
    <figure className="grid items-center gap-6 md:grid-cols-[1fr_1fr] md:gap-10">
      <svg
        viewBox="40 16 340 272"
        role="img"
        aria-labelledby="cutaway-title"
        className="w-full max-w-[460px] justify-self-center font-sans"
      >
        <title id="cutaway-title">
          Simplified cut-away of the clicker: the head sits on a mechanical switch inside the body, above the feather
          skirt
        </title>
        {/* 6 feather skirt */}
        <path d="M124 170 L88 273 L312 273 L276 170 Z" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
        {feathers.map(([top, bottom]) => (
          <line key={top} x1={top} y1="172" x2={bottom} y2="271" stroke="var(--stone)" strokeWidth="1.5" />
        ))}
        {/* body neck with the 3 guide wall */}
        <rect x="124" y="104" width="7" height="68" fill="var(--stone)" />
        <rect x="269" y="104" width="7" height="68" fill="var(--stone)" />
        {/* 5 mounting plate (with the switch cut) and ledge */}
        <rect x="131" y="132" width="41" height="4" fill="var(--ink)" />
        <rect x="228" y="132" width="41" height="4" fill="var(--ink)" />
        <rect x="160" y="152" width="80" height="5" rx="1" fill="var(--ink)" />
        {/* 4 switch: stem and housing */}
        <rect x="172" y="124" width="56" height="28" rx="3" fill="var(--cobalt-tint)" stroke="var(--cobalt)" strokeWidth="2" />
        <rect x="195" y="108" width="10" height="17" fill="var(--cobalt)" />
        {/* 1 head: cylinder plus hemisphere, with the face */}
        <path d="M136 108 L136 94 A64 64 0 0 1 264 94 L264 108 Z" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="181" cy="66" r="4.5" fill="var(--ink)" />
        <circle cx="219" cy="66" r="4.5" fill="var(--ink)" />
        <path d="M182 80 Q200 93 218 80" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
        {/* 2 ring with keyring lug */}
        <rect x="132" y="100" width="136" height="12" rx="2" fill="var(--ink)" />
        <rect x="266" y="102" width="12" height="8" fill="var(--ink)" />
        <circle cx="287" cy="106" r="8" fill="none" stroke="var(--ink)" strokeWidth="4" />
        {/* travel */}
        <g stroke="var(--cobalt)" strokeWidth="1.5" fill="var(--cobalt)">
          <line x1="108" y1="112" x2="108" y2="128" />
          <path d="M104 116 L108 110 L112 116 Z" />
          <path d="M104 124 L108 130 L112 124 Z" />
        </g>
        <text x="100" y="124" textAnchor="end" fontSize="11" fontWeight="600" fill="var(--cobalt)">
          4 mm
        </text>
        <Badge n="1" x={300} y={40} to={[246, 58]} />
        <Badge n="2" x={330} y={88} to={[293, 100]} />
        <Badge n="3" x={92} y={160} to={[124, 160]} />
        <Badge n="4" x={340} y={128} to={[228, 138]} />
        <Badge n="5" x={340} y={160} to={[240, 155]} />
        <Badge n="6" x={340} y={226} to={[293, 226]} />
      </svg>
      <figcaption>
        <ol className="flex flex-col gap-3">
          {PARTS.map(([name, text], i) => (
            <li key={name} className="grid grid-cols-[24px_1fr] gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink font-mono text-xs font-semibold text-paper">
                {i + 1}
              </span>
              <span className="leading-snug">
                <span className="font-semibold">{name}.</span> <span className="text-muted">{text}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-4 font-mono text-xs text-muted">Simplified diagram, not a technical drawing.</p>
      </figcaption>
    </figure>
  );
};

const STEPS = [
  ["Change the CAD", "One script holds every size"],
  ["Print a test piece", "Same orientation as the real part"],
  ["Fit a real switch", "Press it in, feel the fit"],
  ["Measure, revise", "Then round again"],
];

export const Loop = () => (
  <figure className="flex flex-col gap-4">
    <ol className="grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="The loop each revision went through">
      {STEPS.map(([title, text], i) => (
        <li key={title} className="relative flex flex-col gap-1 rounded-xl border border-line bg-surface p-4">
          <span className="font-mono text-xs font-medium text-cobalt">0{i + 1}</span>
          <span className="font-semibold leading-tight">{title}</span>
          <span className="text-sm leading-snug text-muted">{text}</span>
          {i < STEPS.length - 1 && (
            <span aria-hidden="true" className="absolute top-1/2 -right-[11px] z-10 hidden -translate-y-1/2 text-muted sm:block">
              &rarr;
            </span>
          )}
        </li>
      ))}
    </ol>
    <figcaption className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
      <span>
        <span aria-hidden="true">&#8634;</span> Repeated for{" "}
        <strong className="font-semibold text-ink">7 revisions</strong>, v1 to v7
      </span>
      <span>
        <strong className="font-semibold text-ink">2 test coupons</strong>: 3 socket widths, 4 socket depths
      </span>
    </figcaption>
  </figure>
);
