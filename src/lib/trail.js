// The in-site path the visitor took, so a page can offer "Back to …" and send
// them to the exact place they came from (history back), or to the room when
// they landed on the page directly.
let stack = [];

/** Record a location change; type is react-router's PUSH, POP or REPLACE. */
export function record(location, type) {
  const entry = { key: location.key, pathname: location.pathname, hash: location.hash };
  if (stack.length && stack[stack.length - 1].key === entry.key) return;
  if (type === "POP") {
    const i = stack.findIndex((e) => e.key === entry.key);
    stack = i >= 0 ? stack.slice(0, i + 1) : [entry];
  } else if (type === "REPLACE" && stack.length) {
    stack[stack.length - 1] = entry;
  } else {
    stack.push(entry);
  }
}

/** Where "back" goes: the previous in-site location, or null. */
export const previous = () => (stack.length > 1 ? stack[stack.length - 2] : null);

const BRAND_NAMES = { "nail-fairy": "Nail Fairy", "hollywood-nails": "Hollywood Nails", tuu: "my brand" };

const ZONE_NAMES = { engineering: "Engineering", design: "Design", lab: "the Lab", about: "About" };

/** Words for a location, as in "Back to …". */
export function placeName(entry) {
  if (!entry) return "home";
  const slug = entry.hash.replace(/^#/, "");
  if (entry.pathname === "/") {
    if (slug === "work") return "Work";
    return ZONE_NAMES[slug] ? `the room · ${ZONE_NAMES[slug]}` : "home";
  }
  if (entry.pathname === "/visual") return "Visual work";
  const brand = BRAND_NAMES[entry.pathname.replace(/^\/visual\//, "")];
  if (brand && entry.pathname.startsWith("/visual/")) return brand;
  if (entry.pathname === "/about") return "About";
  if (entry.pathname === "/contact") return "Contact";
  return "the previous page";
}

export const _reset = () => (stack = []);
