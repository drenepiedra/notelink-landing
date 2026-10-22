/**
 * Applies the saved (or system) theme before the page is painted so there is
 * no flash of the wrong colour scheme.
 */
(function initThemeEarly() {
  var theme;

  try {
    theme = localStorage.getItem("theme");
  } catch (error) {
    /* localStorage can be unavailable in private contexts */
  }

  if (theme !== "light" && theme !== "dark") {
    theme =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  }

  document.documentElement.setAttribute("data-theme", theme);

  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#14161A" : "#FBFBF9");
})();
