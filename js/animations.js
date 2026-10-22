/**
 * Landing animations:
 *  - the note types itself line by line and reveals each result;
 *  - the clipboard drops its saved links one by one.
 *
 * Both loops restart whenever the language changes and pause while their
 * phone mockup is outside the viewport.
 */

import { getNoteLines } from "./i18n.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function initAnimations() {
  const prefersReducedMotion =
    !!window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const rows = Array.from(document.querySelectorAll(".pr")).map((row) => ({
    row,
    text: row.querySelector(".pr-text"),
    value: row.querySelector(".pr-val"),
    dot: row.querySelector(".pr-dot"),
    tinted: row.hasAttribute("data-tint"),
  }));

  const summary = document.querySelector(".ty-sum");
  const cards = Array.from(document.querySelectorAll(".ty-lk"));
  const caret = document.createElement("span");
  caret.className = "caret";

  const visible = { note: true, clip: true };
  let generation = 0;

  function observe(element, key) {
    if (!element || !("IntersectionObserver" in window)) return;

    new IntersectionObserver(
      (entries) => {
        visible[key] = entries[0].isIntersecting;
      },
      { threshold: 0.2 }
    ).observe(element);
  }

  observe(rows[0] && rows[0].row.closest(".phone"), "note");
  observe(cards[0] && cards[0].closest(".phone"), "clip");

  async function wait(current, ms) {
    await sleep(ms);
    return current === generation;
  }

  async function gate(current, key) {
    while (!visible[key]) {
      await sleep(250);
      if (current !== generation) return false;
    }
    return current === generation;
  }

  function resetNote() {
    rows.forEach(({ row, text, value, dot, tinted }) => {
      text.textContent = "";

      if (value) {
        value.style.transition = "none";
        value.style.opacity = "0";
      }

      if (dot) {
        dot.style.transition = "none";
        dot.style.opacity = "0";
      }

      if (tinted) {
        row.style.transition = "none";
        row.style.background = "transparent";
      }
    });

    if (summary) {
      summary.style.transition = "none";
      summary.style.opacity = "0";
    }

    if (caret.parentNode) caret.remove();
  }

  function hideCards() {
    cards.forEach((card) => {
      card.style.transition = "none";
      card.style.opacity = "0";
      card.style.transform = "translateY(-12px)";

      const chip = card.querySelector(".ty-chip");
      if (chip) {
        chip.style.transition = "none";
        chip.style.opacity = "0";
        chip.style.transform = "scale(.6)";
      }
    });
  }

  function showStatic() {
    const lines = getNoteLines();

    rows.forEach(({ row, text, value, dot, tinted }, index) => {
      text.textContent = lines[index] || "";

      if (value) value.style.opacity = "1";
      if (dot) dot.style.opacity = "1";
      if (tinted) row.style.background = "";
    });

    if (summary) summary.style.opacity = "1";

    cards.forEach((card) => {
      card.style.opacity = "1";
      card.style.transform = "none";

      const chip = card.querySelector(".ty-chip");
      if (chip) {
        chip.style.opacity = "1";
        chip.style.transform = "none";
      }
    });
  }

  async function runNote(current) {
    while (current === generation) {
      if (!(await gate(current, "note"))) return;

      resetNote();
      if (!(await wait(current, 500))) return;

      const lines = getNoteLines();

      for (let index = 0; index < rows.length; index += 1) {
        const { row, text, value, dot, tinted } = rows[index];
        const line = lines[index];

        if (!line) continue;

        text.parentNode.appendChild(caret);

        for (let char = 1; char <= line.length; char += 1) {
          text.textContent = line.slice(0, char);
          if (!(await wait(current, line.length > 12 ? 42 : 70))) return;
        }

        if (dot) {
          dot.style.transition = "opacity .25s";
          dot.style.opacity = "1";
        }

        if (tinted) {
          row.style.transition = "background .35s";
          row.style.background = "";
        }

        if (!(await wait(current, 160))) return;

        if (value) {
          value.style.transition = "opacity .25s";
          value.style.opacity = "1";
        }

        if (!(await wait(current, index === 0 ? 450 : 300))) return;
      }

      caret.remove();

      if (summary) {
        summary.style.transition = "opacity .4s";
        summary.style.opacity = "1";
      }

      if (!(await wait(current, 4500))) return;
    }
  }

  async function dropLinks(current) {
    while (current === generation) {
      if (!(await gate(current, "clip"))) return;

      hideCards();
      if (!(await wait(current, 700))) return;

      for (const card of cards) {
        card.style.transition = "opacity .35s, transform .35s";
        card.style.opacity = "1";
        card.style.transform = "none";

        const chip = card.querySelector(".ty-chip");

        if (chip) {
          if (!(await wait(current, 350))) return;
          chip.style.transition = "opacity .25s, transform .25s";
          chip.style.opacity = "1";
          chip.style.transform = "none";
        }

        if (!(await wait(current, 750))) return;
      }

      if (!(await wait(current, 4500))) return;
    }
  }

  function restart() {
    generation += 1;

    if (prefersReducedMotion) {
      showStatic();
      return;
    }

    resetNote();
    hideCards();
    runNote(generation);
    dropLinks(generation);
  }

  restart();

  return { restart };
}
