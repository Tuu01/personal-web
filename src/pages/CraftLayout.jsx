import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import { Reveal } from "../components/CaseStudy";

const EASE = [0.22, 1, 0.36, 1];

// Case-study frame: breadcrumb, title, lead and facts, hero image, chapters.
const CraftLayout = ({ title, sponsor, meta = {}, heroImage, heroAlt, index, area, tags = [], lead, live, children }) => {
  const reduceMotion = useReducedMotion();
  const enter = (y, delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: EASE, delay },
        };

  return (
    <PageShell title={title}>
      <div className="shell">
        <header className="grid items-end gap-8 pt-10 pb-8 md:grid-cols-[1.1fr_1fr] md:gap-12 md:pt-16 md:pb-10">
          <div>
            <motion.p {...enter(8)} className="eyebrow">
              <Link to="/#work" className="hover:text-cobalt">
                Work
              </Link>
              {index && <span> / {index}</span>}
              {area && <span className="text-cobalt"> / {area}</span>}
            </motion.p>
            <motion.h1
              {...enter(16, 0.05)}
              className="mt-4 max-w-[16ch] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-[56px]"
            >
              {title}
            </motion.h1>
            {tags.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <li key={t} className="rounded border border-line px-2 py-0.5 font-mono text-xs text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="md:pb-1">
            {lead && <p className="max-w-[44ch] text-lg leading-[1.55] text-ink md:text-xl">{lead}</p>}
            {sponsor && <p className="mt-4 text-sm text-muted">{sponsor}</p>}
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-ink px-5 text-[15px] font-semibold text-paper transition-colors hover:bg-cobalt hover:text-on-cobalt"
              >
                Visit the live site
                <span className="font-mono text-xs font-medium opacity-70">{new URL(live).hostname.replace(/^www\./, "")}</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
            <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              {[
                ["Role", meta.role],
                ["Team", meta.team],
                ["Timeline", meta.timeline],
                ["Tools", meta.tools],
              ]
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k} className="border-t border-line pt-2">
                    <dt className="eyebrow">{k}</dt>
                    <dd className="mt-1 text-sm leading-snug">{v}</dd>
                  </div>
                ))}
            </dl>
          </div>
        </header>

        {heroImage && (
          <Reveal>
            <div className="overflow-hidden rounded-xl border border-line bg-surface">
              {/* LCP element on every case-study page. Never lazy. */}
              <img
                src={heroImage}
                alt={heroAlt || title}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="block h-auto w-full"
              />
            </div>
          </Reveal>
        )}

        <div className="space-y-12 py-12 md:space-y-16 md:py-16">{children}</div>
      </div>
    </PageShell>
  );
};

export default CraftLayout;
