import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import RoomStage from "../room/RoomStage";
import { Arrow } from "../brand/Arrow";

// Figures confirmed in the handoff. 332+ has no "as of" date yet, so none is shown.
const stats = [
  { value: "332+", label: "appointments booked" },
  { value: "99.8%", label: "proper doubles matches" },
  { value: "<0.5ms", label: "to score 210 options" },
];

const selected = [
  {
    to: "/work/badminton-queue",
    image: "/assets/projects/BadmintonQueue/bq0.webp",
    alt: "Badminton Queue screens: personal page, live session and home",
    meta: "Live product · Design + engineering · 2026",
    title: "A fair game, every Saturday",
    text: "A match-running app for a ~30-member club. Scores all 210 possible games in under 0.5 ms and lifted proper doubles from 37% to 99.8% in simulation.",
    tags: ["Next.js", "TypeScript", "Firestore", "Figma"],
    links: [
      { label: "Design", to: "/work/badminton-queue#design" },
      { label: "Engineering", to: "/work/badminton-queue#engineering" },
    ],
  },
  {
    to: "/work/nail-fairy",
    image: "/assets/projects/NFBooking/N2.webp",
    alt: "The Nail Fairy booking platform screens",
    meta: "Paid client work · Design + engineering · 2025–2026",
    title: "From paper bookings to a live platform",
    text: "A booking platform for a family-run nail business, designed and built end to end. Live across two locations, 332+ appointments booked.",
    tags: ["React", "Node", "MongoDB"],
    links: [
      { label: "Engineering", to: "/work/nail-fairy#engineering" },
      { label: "Brand", to: "/work/nail-fairy#brand" },
    ],
  },
  {
    to: "/work/splento",
    image: "/assets/projects/AIPlatform/aip0.webp",
    alt: "AI video platform for restaurants, prototype screens",
    meta: "UX research · With Splento · 2026",
    title: "AI video platform for restaurants",
    text: "Interviews, personas and usability evaluation in a team of 5. My final prototype set the direction.",
    tags: ["UX research", "Figma"],
  },
];

const more = [
  { to: "/work/nsms", title: "NSMS", meta: "Earlier work · Desktop salon management · 2024" },
  { to: "/work/2d-game", title: "2D game", meta: "Lab · Java platformer · 2022" },
  { to: "/work/badminton-clicker", title: "Badminton clicker", meta: "Lab · Made by hand · coming soon" },
];

function Card({ item, wide }) {
  return (
    <article className={`group flex flex-col gap-5 ${wide ? "md:col-span-2 md:grid md:grid-cols-[1.35fr_1fr] md:items-center md:gap-10" : ""}`}>
      <Link
        to={item.to}
        className="block overflow-hidden rounded-xl border border-line bg-surface"
        aria-label={item.title}
        tabIndex={-1}
      >
        <img
          src={item.image}
          alt={item.alt}
          loading="lazy"
          className="aspect-[16/10] h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
      </Link>
      <div className="flex flex-col gap-3">
        <span className="eyebrow">{item.meta}</span>
        <h3 className="text-2xl font-semibold leading-tight tracking-[-0.01em] md:text-[28px]">
          <Link to={item.to} className="hover:text-cobalt">
            {item.title}
          </Link>
        </h3>
        <p className="max-w-[52ch] leading-relaxed text-muted">{item.text}</p>
        <ul className="flex flex-wrap gap-2 pt-1">
          {item.tags.map((t) => (
            <li key={t} className="rounded border border-line px-2 py-0.5 font-mono text-xs text-muted">
              {t}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-5 pt-2">
          {(item.links || [{ label: "Read the case study", to: item.to }]).map((l) => (
            <Link key={l.to} to={l.to} className="inline-flex items-center gap-1.5 font-semibold text-cobalt hover:text-ink">
              {l.label} <Arrow className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}

const Home = () => (
  <PageShell>
    <RoomStage />

    <section aria-label="In numbers" className="shell py-10 md:py-14">
      <dl className="grid grid-cols-1 gap-x-8 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse gap-1 border-t border-line py-4">
            <dt className="eyebrow">{s.label}</dt>
            <dd className="text-4xl font-semibold leading-none tracking-[-0.03em]">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>

    <section id="work" aria-labelledby="work-title" className="shell py-10 md:py-16">
      <h2 id="work-title" className="mb-10 flex items-baseline gap-3 text-[28px] font-semibold tracking-[-0.02em] md:text-4xl">
        <span className="font-mono text-base font-medium text-cobalt">01</span>
        Selected work
      </h2>
      <div className="grid gap-14 md:grid-cols-2 md:gap-x-10 md:gap-y-16">
        {selected.map((item, i) => (
          <Card key={item.to} item={item} wide={i === 0} />
        ))}
      </div>
    </section>

    <section aria-labelledby="more-title" className="shell py-10 md:py-16">
      <h2 id="more-title" className="mb-6 flex items-baseline gap-3 text-[28px] font-semibold tracking-[-0.02em] md:text-4xl">
        <span className="font-mono text-base font-medium text-cobalt">02</span>
        More work
      </h2>
      <ul className="border-b border-line">
        {more.map((m) => (
          <li key={m.to}>
            <Link
              to={m.to}
              className="group flex items-center justify-between gap-4 border-t border-line py-5 hover:text-cobalt"
            >
              <span className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                <span className="text-xl font-semibold">{m.title}</span>
                <span className="eyebrow">{m.meta}</span>
              </span>
              <Arrow />
            </Link>
          </li>
        ))}
      </ul>
    </section>

    <section aria-labelledby="about-title" className="shell py-10 md:py-16">
      <div className="grid gap-6 border-t border-line pt-10 md:grid-cols-[1fr_1.4fr] md:gap-12">
        <h2 id="about-title" className="flex items-baseline gap-3 text-[28px] font-semibold tracking-[-0.02em] md:text-4xl">
          <span className="font-mono text-base font-medium text-cobalt">03</span>
          About
        </h2>
        <div className="flex flex-col gap-4 text-lg leading-relaxed text-muted">
          <p className="text-ink">
            Before I wrote software, I spent six years running the bookings and payments of a two-location business. I
            build from first-hand knowledge, not gathered requirements.
          </p>
          <p>MSc Advanced Computer Science, Queen Mary University of London. React, Next.js, TypeScript, Node and Figma.</p>
          <Link to="/about" className="inline-flex w-fit items-center gap-1.5 font-semibold text-cobalt hover:text-ink">
            More about me <Arrow className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  </PageShell>
);

export default Home;
