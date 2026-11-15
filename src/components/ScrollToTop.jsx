import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Where each history entry was scrolled to when the visitor left it.
const positions = new Map();

// New page: start at the top, or at #section if the link names one.
// Back / forward (POP): return to where that entry was scrolled to.
// Same page, new hash: scroll only if the hash names an element. The room uses
// the hash for its zones (#engineering…), and those must not move the page.
export default function ScrollToTop({ children }) {
  const location = useLocation();
  const { pathname, hash, key } = location;
  const navType = useNavigationType();
  const last = useRef({ path: null, key: null });

  useEffect(() => {
    try {
      window.history.scrollRestoration = "manual";
    } catch {
      // Safari in private mode throws on this; the default is fine.
    }

    // The old page is still on screen here (it fades out first), so this is
    // the scroll position of the entry being left.
    if (last.current.key) positions.set(last.current.key, window.scrollY);
    const samePage = last.current.path === pathname;
    last.current = { path: pathname, key };

    let timer;
    let tries = 0;

    // The page transition mounts the new page only after the old one has
    // faded out (App.jsx, 180 ms), so on a new page wait for the swap first.
    const saved = navType === "POP" ? positions.get(key) : undefined;
    if (saved !== undefined && !samePage) {
      const restore = () => {
        const fits = document.documentElement.scrollHeight - window.innerHeight >= saved - 2;
        if (fits || tries++ >= 20) window.scrollTo({ top: saved, left: 0, behavior: "auto" });
        else timer = setTimeout(restore, 50);
      };
      timer = setTimeout(restore, 250);
      return () => clearTimeout(timer);
    }

    const find = () => {
      try {
        return hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
      } catch {
        return null;
      }
    };

    if (!samePage) window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (!hash) return;

    // Until the swap a #section could match the old page (case studies and the
    // room both use #engineering / #design), so keep looking briefly.
    const go = () => {
      const el = find();
      if (el) el.scrollIntoView({ behavior: samePage ? "smooth" : "auto", block: "start" });
      else if (tries++ < 20) timer = setTimeout(go, 50);
    };
    if (samePage) go();
    else timer = setTimeout(go, 250);
    return () => clearTimeout(timer);
  }, [pathname, hash, key, navType]);

  return children;
}
