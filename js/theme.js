/**
 * Theme switching (light / dark) and system preference syncing.
 */

import { onLangChange, t } from "./i18n.js";

const META_COLORS = {
  light: "#FBFBF9",
  dark: "#14161A",
};

function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function updateLabel() {
  const button = document.querySelector("[data-theme-btn]");
  if (!button) return;

  button.setAttribute("aria-label", t(currentTheme() === "dark" ? "themeL" : "themeD"));
}

export function setTheme(theme, persist) {
  document.documentElement.setAttribute("data-theme", theme);

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", META_COLORS[theme]);

  if (persist) {
    try {
      localStorage.setItem("theme", theme);
    } catch (error) {
      /* ignore unavailable storage */
    }
  }

  updateLabel();
}

export function initTheme() {
  const button = document.querySelector("[data-theme-btn]");

  if (button) {
    button.addEventListener("click", () => {
      setTheme(currentTheme() === "dark" ? "light" : "dark", true);
    });
  }

  const media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  if (media && media.addEventListener) {
    media.addEventListener("change", (event) => {
      let stored = null;

      try {
        stored = localStorage.getItem("theme");
      } catch (error) {
        /* ignore unavailable storage */
      }

      if (stored !== "light" && stored !== "dark") {
        setTheme(event.matches ? "dark" : "light", false);
      }
    });
  }

  onLangChange(updateLabel);
  updateLabel();
}
