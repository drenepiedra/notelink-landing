/**
 * Landing animations:
 *  - the note types itself line by line, reveals results, income and comments,
 *    collapses its subscriptions section and shows the what-if card;
 *  - the clipboard drops its saved links, categories, pins and swipe-to-edit;
 *  - the calendar fills its month, planned entries, subscriptions and reminder;
 *  - the insights screen settles debts and grows its statistics bars.
 *
 * Every loop restarts on language change and pauses while its phone mockup is
 * outside the viewport.
 */

import { getNoteLines } from "./i18n.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const selectAll = (selector, root = document) => Array.from(root.querySelectorAll(selector));

export function initAnimations() {
  const prefersReducedMotion =
    !!window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const notePhone = document.querySelector('[data-demo="note"]');
  const clipPhone = document.querySelector('[data-demo="clip"]');
  const calPhone = document.querySelector('[data-demo="cal"]');
  const insightsPhone = document.querySelector('[data-demo="insights"]');

  const noteRows = selectAll("[data-note-row]", notePhone).map((row) => ({
    row,
    text: row.querySelector(".pr-text"),
    value: row.querySelector(".pr-val"),
    dot: row.querySelector(".pr-dot"),
    tinted: row.hasAttribute("data-tint"),
  }));

  const sectionToggle = notePhone && notePhone.querySelector("[data-section-toggle]");
  const sectionChildren = selectAll("[data-section-child]", notePhone);
  const zoomPill = notePhone && notePhone.querySelector("[data-zoom]");
  const cardsPill = notePhone && notePhone.querySelector(".tool-pill--ghost");
  const noteTools = [zoomPill, cardsPill].filter(Boolean);
  const whatif = notePhone && notePhone.querySelector("[data-whatif]");
  const summary = notePhone && notePhone.querySelector(".ty-sum");

  const clipCards = selectAll(".ty-lk", clipPhone);
  const clipGroups = selectAll("[data-clip-group]", clipPhone);
  const clipChips = selectAll('[data-anim="pop"]', clipPhone);
  const clipToast = clipPhone && clipPhone.querySelector("[data-clip-toast]");
  const clipFilters = selectAll(".cat-chip", clipPhone);

  const calDays = selectAll('[data-anim="day"]', calPhone);
  const calReveals = selectAll('[data-anim="rise"]', calPhone);
  const calReminder = calPhone && calPhone.querySelector("[data-cal-reminder]");

  const insightTotals = insightsPhone && insightsPhone.querySelector(".debt-totals");
  const insightRows = selectAll(".debt-row", insightsPhone);
  const insightChecks = selectAll(".debt-check", insightsPhone);
  const insightStatLine = insightsPhone && insightsPhone.querySelector("[data-stat-line]");
  const insightBars = insightsPhone && insightsPhone.querySelector("[data-stat-bars]");
  const insightActions = insightsPhone && insightsPhone.querySelector(".ins-actions");
  const insightReveals = selectAll("[data-anim]", insightsPhone);

  const caret = document.createElement("span");
  caret.className = "caret";

  const visible = { note: true, clip: true, cal: true, insights: true };
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

  observe(notePhone, "note");
  observe(clipPhone, "clip");
  observe(calPhone, "cal");
  observe(insightsPhone, "insights");

  const mark = (element) => element && element.classList.add("is-in");
  const unmark = (element) => element && element.classList.remove("is-in");
  const markAll = (elements) => elements.forEach(mark);
  const unmarkAll = (elements) => elements.forEach(unmark);

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
    noteRows.forEach(({ row, text, value, dot, tinted }) => {
      if (text) text.textContent = "";

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

      row.classList.remove("is-collapsed");
    });

    if (sectionToggle) sectionToggle.classList.remove("is-collapsed");
    sectionChildren.forEach((row) => row.classList.remove("is-collapsed"));
    unmarkAll(noteTools);
    unmark(whatif);
    unmark(summary);
    if (caret.parentNode) caret.remove();
  }

  function resetClipboard() {
    clipCards.forEach((card) => card.classList.remove("is-in", "is-swiped"));
    unmarkAll(clipGroups);
    unmarkAll(clipChips);
    unmark(clipToast);
    clipFilters.forEach((chip, index) => chip.classList.toggle("is-active", index === 0));
  }

  function resetCalendar() {
    unmarkAll(calDays);
    unmarkAll(calReveals);
    unmark(calReminder);
  }

  function resetInsights() {
    unmarkAll(insightReveals);
    unmark(insightBars);
    insightChecks.forEach((check) => check.classList.remove("is-in"));
  }

  function showStatic() {
    const lines = getNoteLines();

    noteRows.forEach(({ row, text, value, dot, tinted }, index) => {
      if (text) text.textContent = lines[index] || "";

      if (value) {
        value.style.transition = "none";
        value.style.opacity = "1";
      }

      if (dot) {
        dot.style.transition = "none";
        dot.style.opacity = "1";
      }

      if (tinted) row.style.background = "";
      row.classList.remove("is-collapsed");
    });

    if (sectionToggle) sectionToggle.classList.remove("is-collapsed");
    sectionChildren.forEach((row) => row.classList.remove("is-collapsed"));
    markAll(noteTools);
    mark(whatif);
    mark(summary);

    markAll(clipCards);
    markAll(clipGroups);
    markAll(clipChips);
    unmark(clipToast);
    clipFilters.forEach((chip, index) => chip.classList.toggle("is-active", index === 0));

    markAll(calDays);
    markAll(calReveals);
    mark(calReminder);

    markAll(insightReveals);
    mark(insightBars);
    insightChecks.forEach((check) => {
      if (check.classList.contains("is-done")) mark(check);
    });
  }

  async function runNote(current) {
    while (current === generation) {
      if (!(await gate(current, "note"))) return;

      resetNote();
      if (!(await wait(current, 450))) return;

      markAll(noteTools);

      const lines = getNoteLines();

      for (let index = 0; index < noteRows.length; index += 1) {
        const { row, text, value, dot, tinted } = noteRows[index];
        const line = lines[index];

        if (!line || !text) continue;

        text.parentNode.appendChild(caret);

        for (let char = 1; char <= line.length; char += 1) {
          text.textContent = line.slice(0, char);
          if (!(await wait(current, line.length > 14 ? 30 : 48))) return;
        }

        if (dot) {
          dot.style.transition = "opacity .25s";
          dot.style.opacity = "1";
        }

        if (tinted) {
          row.style.transition = "background .35s";
          row.style.background = "";
        }

        if (!(await wait(current, 140))) return;

        if (value) {
          value.style.transition = "opacity .25s";
          value.style.opacity = "1";
        }

        if (!(await wait(current, index === 0 ? 340 : 190))) return;
      }

      caret.remove();
      mark(summary);
      if (!(await wait(current, 750))) return;

      mark(whatif);
      if (!(await wait(current, 1200))) return;

      if (sectionToggle) sectionToggle.classList.add("is-collapsed");
      sectionChildren.forEach((row) => row.classList.add("is-collapsed"));
      if (!(await wait(current, 1500))) return;

      if (sectionToggle) sectionToggle.classList.remove("is-collapsed");
      sectionChildren.forEach((row) => row.classList.remove("is-collapsed"));
      if (!(await wait(current, 4200))) return;
    }
  }

  async function dropLinks(current) {
    while (current === generation) {
      if (!(await gate(current, "clip"))) return;

      resetClipboard();
      if (!(await wait(current, 500))) return;

      markAll(clipGroups);
      if (!(await wait(current, 320))) return;

      for (const card of clipCards) {
        mark(card);
        if (!(await wait(current, 300))) return;

        for (const chip of selectAll('[data-anim="pop"]', card)) {
          mark(chip);
          if (!(await wait(current, 110))) return;
        }

        if (!(await wait(current, 430))) return;
      }

      mark(clipToast);
      clipFilters.forEach((chip, index) => chip.classList.toggle("is-active", index === 1));
      if (!(await wait(current, 1200))) return;

      unmark(clipToast);
      if (!(await wait(current, 260))) return;

      if (clipCards[0]) {
        clipCards[0].classList.add("is-swiped");
        if (!(await wait(current, 1500))) return;
        clipCards[0].classList.remove("is-swiped");
      }

      if (!(await wait(current, 700))) return;

      clipFilters.forEach((chip, index) => chip.classList.toggle("is-active", index === 0));
      if (!(await wait(current, 3600))) return;
    }
  }

  async function fillCalendar(current) {
    while (current === generation) {
      if (!(await gate(current, "cal"))) return;

      resetCalendar();
      if (!(await wait(current, 350))) return;

      markAll(calDays);
      if (!(await wait(current, 900))) return;

      for (const item of calReveals) {
        mark(item);
        if (!(await wait(current, 170))) return;
      }

      mark(calReminder);
      if (!(await wait(current, 6200))) return;
    }
  }

  async function settleInsights(current) {
    while (current === generation) {
      if (!(await gate(current, "insights"))) return;

      resetInsights();
      if (!(await wait(current, 350))) return;

      mark(insightTotals);
      if (!(await wait(current, 350))) return;

      for (const row of insightRows) {
        mark(row);
        if (!(await wait(current, 260))) return;
      }

      if (insightChecks[0]) mark(insightChecks[0]);
      if (!(await wait(current, 350))) return;

      mark(insightStatLine);
      if (!(await wait(current, 350))) return;

      mark(insightBars);
      if (!(await wait(current, 900))) return;

      mark(insightActions);
      if (!(await wait(current, 6000))) return;
    }
  }

  function restart() {
    generation += 1;

    if (prefersReducedMotion) {
      showStatic();
      return;
    }

    resetNote();
    resetClipboard();
    resetCalendar();
    resetInsights();

    runNote(generation);
    dropLinks(generation);
    fillCalendar(generation);
    settleInsights(generation);
  }

  restart();

  return { restart };
}
