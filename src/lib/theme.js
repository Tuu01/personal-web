import { useSyncExternalStore } from "react";

// Day / night is one site-wide setting: the lamp in the room, the switch under
// it and the 3D lighting all read and write the same value. index.html sets the
// initial value on <html> before first paint; this store only follows it.
const KEY = "tuu-theme";
const listeners = new Set();

const read = () =>
  typeof document !== "undefined" &&
  document.documentElement.dataset.theme === "dark"
    ? "dark"
    : "light";

export function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    // Private mode or blocked storage: the switch still works for this visit.
  }
  listeners.forEach((l) => l());
}

export function toggleTheme() {
  setTheme(read() === "dark" ? "light" : "dark");
}

const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useTheme() {
  return useSyncExternalStore(subscribe, read, () => "light");
}
