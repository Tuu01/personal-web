import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import BackLink from "./BackLink";

// Header, content, footer. Every route but the case studies uses this
// directly; CraftLayout wraps it for the case-study header.
const SITE = "Trong Tu Luu (Tuu)";

const PageShell = ({ children, title, footerPrompt = true, back = true }) => (
  <div className="flex min-h-dvh flex-col bg-paper text-ink">
    {/* React 19 hoists this into <head>. */}
    <title>{title ? `${title} · ${SITE}` : `${SITE} · Software engineer and product designer`}</title>
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
    >
      Skip to content
    </a>
    <Navbar />
    <main id="main" className="flex-1">
      {back && (
        <div className="shell pt-4 md:pt-6">
          <BackLink />
        </div>
      )}
      {children}
    </main>
    <Footer prompt={footerPrompt} />
  </div>
);

export default PageShell;
