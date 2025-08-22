// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ children }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Don’t let the browser restore previous scroll positions
    try {
      window.history.scrollRestoration = "manual";
    } catch {}

    // If navigating to a hash (#section), scroll to that element
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    // Otherwise always start at the top
    window.scrollTo({ top: 0, left: 0, behavior: "auto" }); // or "smooth"
  }, [pathname, hash]);

  return children;
}
