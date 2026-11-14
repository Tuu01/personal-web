import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import { Monogram, Wordmark } from "../brand/Wordmark";

// Only pieces that exist in this repo are shown. The Nail Fairy brand images
// and the poster / illustration pieces are not here yet, so they are listed
// as coming soon rather than shown as empty frames.
const Figure = ({ children, title, text }) => (
  <figure className="flex flex-col gap-3">
    <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-line bg-surface">
      {children}
    </div>
    <figcaption className="flex flex-col gap-1">
      <span className="font-semibold">{title}</span>
      <span className="text-sm leading-snug text-muted">{text}</span>
    </figcaption>
  </figure>
);

const Visual = () => (
  <PageShell title="Visual work">
    <div className="shell py-12 md:py-20">
      <header className="flex max-w-[60ch] flex-col gap-4">
        <p className="eyebrow">Visual work</p>
        <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-[56px]">
          Brand, print and graphic work
        </h1>
        <p className="text-lg leading-relaxed text-muted">
          Smaller pieces that show visual range. Each has one line of context; the product case studies are under{" "}
          <Link to="/#work" className="text-cobalt underline underline-offset-4">
            Work
          </Link>
          .
        </p>
      </header>

      <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <Figure title="[tuu]¹⁰|1024 identity" text="Personal brand: wordmark, monogram, patterns and motion. 2026.">
          <Wordmark full className="text-[clamp(28px,4vw,40px)]" />
        </Figure>
        <Figure title="[t]¹⁰ monogram" text="Avatar and favicon set from 16 to 1024px.">
          <span className="flex h-36 w-36 items-center justify-center rounded-full bg-ink">
            <Monogram className="text-[52px] text-paper" />
          </span>
        </Figure>
        <Figure
          title="The Nail Fairy · identity"
          text="A family-run nail stall in Bradford, open since 2004. Logo, loyalty card and stickers."
        >
          <Link
            to="/work/nail-fairy#design"
            className="font-mono text-xs uppercase tracking-[0.08em] text-muted hover:text-cobalt"
          >
            Images coming soon
          </Link>
        </Figure>
      </div>
    </div>
  </PageShell>
);

export default Visual;
