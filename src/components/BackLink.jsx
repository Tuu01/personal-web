import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { placeName, previous } from "../lib/trail";

// "← Back to …" at the top of every page but the room. With an in-site page
// behind it, it goes back in history (same place, same scroll, the room with
// the same zone and list open); landing here directly, it opens the room.
const cls =
  "inline-flex min-h-10 w-fit items-center gap-2 font-mono text-xs font-medium text-muted hover:text-cobalt focus:outline-none focus-visible:text-cobalt focus-visible:underline";

export default function BackLink() {
  const navigate = useNavigate();
  const [prev] = useState(previous);
  const label = `Back to ${placeName(prev)}`;
  const arrow = <span aria-hidden="true">&larr;</span>;

  if (!prev) {
    return (
      <Link to="/" className={cls}>
        {arrow} {label}
      </Link>
    );
  }
  return (
    <a
      href={prev.pathname + prev.hash}
      className={cls}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(-1);
      }}
    >
      {arrow} {label}
    </a>
  );
}
