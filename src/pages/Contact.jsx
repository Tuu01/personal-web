import PageShell from "../components/PageShell";
import { Arrow } from "../brand/Arrow";
import { CV_URL, EMAIL, GITHUB, LINKEDIN } from "../lib/site";

const row =
  "group flex items-center justify-between gap-4 border-t border-line py-4 text-lg font-semibold hover:text-cobalt";

const Contact = () => (
  <PageShell footerPrompt={false}>
    <div className="shell grid gap-12 py-12 md:grid-cols-[1.3fr_1fr] md:gap-16 md:py-20">
      <div className="flex flex-col gap-6">
        <p className="eyebrow">CV and contact</p>
        <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-[56px]">
          Let&rsquo;s work together.
        </h1>
        <a
          href={`mailto:${EMAIL}`}
          className="w-fit break-all text-2xl font-semibold text-cobalt underline decoration-2 underline-offset-[6px] hover:text-ink md:text-3xl"
        >
          {EMAIL}
        </a>
        <p className="max-w-[46ch] text-lg leading-relaxed text-muted">
          Based in London. British citizen with full right to work in the UK.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        <div>
          <h2 className="eyebrow mb-2">CV</h2>
          <a href={CV_URL} download className={`${row} border-b`}>
            <span className="flex flex-col">
              CV
              <span className="font-mono text-xs font-medium text-muted">PDF · 1 page</span>
            </span>
            <Arrow className="h-[18px] w-[18px] rotate-90" />
          </a>
        </div>
        <div>
          <h2 className="eyebrow mb-2">Elsewhere</h2>
          <div className="flex flex-col border-b border-line">
            <a href={GITHUB} target="_blank" rel="noreferrer" className={row}>
              github.com/Tuu01 <Arrow className="h-[18px] w-[18px] -rotate-45" />
            </a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" className={row}>
              LinkedIn <Arrow className="h-[18px] w-[18px] -rotate-45" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </PageShell>
);

export default Contact;
