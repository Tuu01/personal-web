import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import { Reveal } from "../components/CaseStudy";
import { Arrow } from "../brand/Arrow";
import { CV_URL } from "../lib/site";

const facts = [
  ["Based in", "London, UK"],
  ["Right to work", "British citizen, full right to work in the UK"],
  ["Education", "MSc Advanced Computer Science, Queen Mary (2026) · BSc Computer Science, City (2024)"],
  ["Tools", "React, Next.js, TypeScript, Node, MongoDB, Figma"],
];

const Section = ({ id, index, title, children }) => (
  <section id={id} className="grid gap-4 border-t border-line pt-8 md:grid-cols-[1fr_2fr] md:gap-12">
    <h2 className="flex items-baseline gap-3 text-2xl font-semibold tracking-[-0.01em]">
      <span className="font-mono text-sm font-medium text-cobalt">{index}</span>
      {title}
    </h2>
    <div className="flex max-w-[62ch] flex-col gap-4 text-lg leading-[1.6] text-muted">{children}</div>
  </section>
);

const Soon = ({ children }) => (
  <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">{children}</p>
);

const About = () => (
  <PageShell title="About">
    <div className="shell py-12 md:py-20">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-16">
        <Reveal>
          <img
            src="/assets/about/portrait.webp"
            srcSet="/assets/about/portrait.webp 1x, /assets/about/portrait@2x.webp 2x"
            width="800"
            height="1000"
            alt="Tuu in a white shirt, smiling, on a London street at sunset"
            fetchPriority="high"
            className="aspect-[4/5] h-auto w-full rounded-xl border border-line bg-surface object-cover"
          />
          <dl className="mt-6 flex flex-col">
            {facts.map(([k, v]) => (
              <div key={k} className="border-t border-line py-3">
                <dt className="eyebrow">{k}</dt>
                <dd className="mt-1 text-[15px] leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="flex flex-col gap-12">
          <Reveal>
            <p className="eyebrow">About</p>
            <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-[56px]">
              Trong Tu Luu
            </h1>
            <p className="mt-5 max-w-[46ch] text-xl leading-[1.5]">
              I research what people and businesses need, design the experience, and build it. Before I wrote
              software, I spent six years running the bookings and payments of a two-location salon.
            </p>
          </Reveal>

          <Section id="background" index="01" title="Background">
            <p>
              I work across the whole product, from user research and prototyping to full-stack build. Recent work
              spans a user-centred design study for an AI video platform, a live salon booking platform I designed
              and built end to end, and a club app that is still running every week.
            </p>
          </Section>

          <Section id="education" index="02" title="Education">
            <p>
              <span className="text-ink">MSc Advanced Computer Science</span>, Queen Mary University of London,
              2026. The group project with Splento, an AI video platform for restaurants, received a Distinction.
            </p>
            <p>
              <span className="text-ink">BSc Computer Science</span>, City, University of London, 2024.
            </p>
          </Section>

          <Section id="how-i-work" index="03" title="How I work">
            <p>
              I pair a designer&rsquo;s process with a developer&rsquo;s precision and an operator&rsquo;s instinct.
              Years running a busy salon taught me that software only matters if it solves a real problem fast. So I
              start from research and real workflows, and build tools people want to use every day.
            </p>
          </Section>

          <Section id="outside-work" index="04" title="Outside work">
            <div id="badminton" className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-ink">Badminton</h3>
              <p>Running, the gym and badminton.</p>
              <Soon>Photos coming soon</Soon>
            </div>
            <div id="photography" className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-ink">Photography</h3>
              <p>Photography, cinematic videography and making social content.</p>
              <Soon>A selection of photos is coming soon</Soon>
            </div>
          </Section>

          <div className="flex flex-wrap gap-3 border-t border-line pt-8">
            <Link
              to="/#work"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-ink px-5 text-[15px] font-semibold text-paper hover:bg-cobalt hover:text-on-cobalt"
            >
              See my work <Arrow className="h-4 w-4" />
            </Link>
            <a
              href={CV_URL}
              download
              className="inline-flex h-11 items-center rounded-lg border border-line px-5 text-[15px] font-semibold hover:border-ink"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </div>
  </PageShell>
);

export default About;
