/**
 * "What's new" section: loads blog.json and renders commit updates.
 */

import { getLang, t } from "./i18n.js";

const REPO_URL = "https://github.com/drenepiedra/noteLink";
const PAGE_SIZE = 6;

let posts = null;
let showAll = false;
let failed = false;

function escapeHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, (character) => {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[character];
  });
}

function tagLabel(tag) {
  return t("tag_" + tag) || t("tag_novedad");
}

function formatDate(isoDate) {
  try {
    const locale = getLang() === "es" ? "es-ES" : "en-US";
    return new Date(isoDate)
      .toLocaleDateString(locale, { day: "2-digit", month: "short", year: "numeric" })
      .replace(/\./g, "");
  } catch (error) {
    return String(isoDate || "").slice(0, 10);
  }
}

export function renderBlog() {
  const list = document.getElementById("blog-list");
  if (!list) return;

  if (failed) {
    list.innerHTML = '<div class="blog-status">' + escapeHtml(t("blogerr")) + "</div>";
    return;
  }

  if (posts === null) {
    list.innerHTML = '<div class="blog-status">' + escapeHtml(t("blogload")) + "</div>";
    return;
  }

  if (!posts.length) {
    list.innerHTML = '<div class="blog-status">' + escapeHtml(t("blogempty")) + "</div>";
    return;
  }

  const visiblePosts = showAll ? posts : posts.slice(0, PAGE_SIZE);
  const lang = getLang();

  list.innerHTML = visiblePosts
    .map((post) => {
      const content = post[lang] || post.es || {};
      const title = content.title || (post.es && post.es.title) || "";

      return (
        '<a class="post" href="' +
        escapeHtml(post.url || REPO_URL) +
        '" target="_blank" rel="noopener">' +
        '<div class="post-top">' +
        '<span class="post-date">' +
        escapeHtml(formatDate(post.date)) +
        "</span>" +
        '<span class="post-tag">' +
        escapeHtml(tagLabel(post.tag)) +
        "</span>" +
        "</div>" +
        '<h3 class="post-title">' +
        escapeHtml(title) +
        "</h3>" +
        (content.body ? '<p class="post-body">' + escapeHtml(content.body) + "</p>" : "") +
        '<span class="post-cta">' +
        escapeHtml(t("blogcommit")) +
        " &rarr;</span></a>"
      );
    })
    .join("");

  const button = document.getElementById("blog-more");
  if (button) {
    button.hidden = posts.length <= PAGE_SIZE;
    button.textContent = showAll ? t("blogl") : t("blogmore");
  }
}

function loadBlog() {
  fetch("blog.json", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("http");
      return response.json();
    })
    .then((data) => {
      const entries = Array.isArray(data) ? data : data.posts || [];

      posts = entries
        .filter((post) => post && post.date)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      renderBlog();
    })
    .catch(() => {
      failed = true;
      renderBlog();
    });
}

export function initBlog() {
  const button = document.getElementById("blog-more");

  if (button) {
    button.addEventListener("click", () => {
      showAll = !showAll;
      renderBlog();
    });
  }

  loadBlog();
}
