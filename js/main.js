/**
 * Entry point: wires the independent modules together.
 */

import { initI18n, onLangChange } from "./i18n.js";
import { initTheme } from "./theme.js";
import { initAnimations } from "./animations.js";
import { initBlog, renderBlog } from "./blog.js";

initI18n();
initTheme();

const animations = initAnimations();

initBlog();

onLangChange(() => {
  animations.restart();
  renderBlog();
});
