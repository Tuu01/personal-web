import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// New page: start at the top, or at #section if the link names one.
// Same page, new hash: scroll only if the hash names an element. The room uses
// the hash for its zones (#engineering…), and those must not move the page.
export default function ScrollToTop({ children }) {
  const { pathname, hash } = useLocation();
  const lastPath = useRef(null);

  useEffect(() => {
    try {
      window.history.scrollRestoration = "manual";
    } catch {
      // Safari in private mode throws on this; the default is fine.
    }

    const samePage = lastPath.current === pathname;
    lastPath.current = pathname;

    const find = () => {
      try {
        return hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
      } catch {
        return null;
      }
    };

    if (!samePage) window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (!hash) return;

    // The page transition mounts the new page only after the old one has
    // faded out, so its #section may not exist yet: keep looking briefly.
    let tries = 0;
    let timer;
    const go = () => {
      const el = find();
      if (el) el.scrollIntoView({ behavior: samePage ? "smooth" : "auto", block: "start" });
      else if (tries++ < 20) timer = setTimeout(go, 50);
    };
    go();
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return children;
}
