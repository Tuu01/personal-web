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

    let el = null;
    if (hash) {
      try {
        el = document.getElementById(decodeURIComponent(hash.slice(1)));
      } catch {
        el = null;
      }
    }
    if (el) {
      el.scrollIntoView({ behavior: samePage ? "smooth" : "auto", block: "start" });
      return;
    }
    if (!samePage) window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return children;
}
