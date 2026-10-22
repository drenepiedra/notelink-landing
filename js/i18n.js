/**
 * Translations and language handling.
 *
 * Every user-facing string lives here. HTML nodes opt in with `data-t="key"`;
 * `data-th="n"` is used by the clipboard thumbnails (first letter of `lk<n>`).
 */

const SUPPORTED_LANGS = ["en", "es"];
const DEFAULT_LANG = "en";

const TRANSLATIONS = {
  en: {
    title: "Notelink · Write your math, save your links",
    meta: "A notepad that adds things up for you and saves the links you copy.",
    langLabel: "Language",
    themeD: "Switch to dark mode",
    themeL: "Switch to light mode",

    /* Hero */
    h1a: "Write your math,",
    h1b: "save your links",
    sub: "A notepad that adds things up for you. Every line gets its answer beside it, and the links you copy are saved with their price.",
    dl: "Download app",
    plansbtn: "See plans ↓",

    /* Phone demos */
    c1: "# a notepad that does the math",
    demo: "# demo · what it looks like inside",
    cap1: "note · the total adds itself up",
    cap2: "clipboard · links with prices",
    clip: "Clipboard",
    oct: "October",
    trip: "Trip",
    shop: "Shopping",
    spent: "Spent",
    balance: "Balance",
    save: "Save links when copied",
    lk1: "Running shoes on sale",
    lk2: "Travel backpack",
    lk3: "How to save money every month",
    lk4: "Creamy pasta recipe",
    lk5: "Flights Madrid – Lima",
    lk6: "Flutter tutorial",
    t1: "1 h ago",
    t2: "2 h ago",
    t3: "3 h ago",
    yd: "Yesterday",

    /* Features */
    inc: "# what you get",
    k1: "totals",
    k2: "links",
    k3: "prices",
    k4: "balance",
    k5: "share",
    k6: "tabs",
    v1: "type “total” and it adds up everything above",
    v2: "what you copy lands in Clipboard",
    v3: "a link with a price is suggested as an expense",
    v4: "budget − total, instantly",
    v5: "press and hold any line",
    v6: "one note per topic",

    /* Plans */
    pl: "# plans",
    pick: "Pick your plan.",
    basic: "Basic",
    rec: "Recommended",
    f1: "✓ Up to 7 lines",
    f2: "✓ Up to 3 saved links",
    f6: "✓ Just two tabs",
    f3: "✓ Unlimited lines",
    f4: "✓ Unlimited links",
    f8: "✓ All functions",

    /* FAQ */
    faq: "# faq",
    q1: "What is Notelink?",
    a1: "It's a notepad that calculates. You write each expense on its own line, the answer shows up beside it, and a “Total” line adds up everything above.",
    q2: "What happens to the links I copy?",
    a2: "They're saved in the pinned Clipboard tab, with a thumbnail, title and domain. If the link is a product with a price, we suggest it as a possible expense and you decide whether it goes into the note.",
    q3: "How much does it cost?",
    a3: "Basic costs $0.99 and includes up to 7 lines and 3 links. Pro costs $1.99 and has no limits.",
    q4: "How do I share a line?",
    a4: "Press and hold the line: it comes into focus and a menu appears with Share, Copy line, Copy result and Delete.",

    /* Blog */
    blogs: "Blog",
    blogk: "# what's new",
    blogh: "Latest updates",
    blogsub: "Straight from the repo: the features we ship, commit by commit.",
    blogmore: "Show all updates",
    blogl: "Show less",
    blogload: "Loading updates...",
    blogempty: "No updates yet.",
    blogerr: "Couldn't load updates. Open the landing from the web to see them.",
    blogcommit: "View commit",
    tag_novedad: "New",
    tag_ui: "Design",
    tag_pago: "Purchases",
    tag_fix: "Fix",

    /* Footer */
    tryit: "try it",
    now: "now",
    priv: "Privacy",
    terms: "Terms",
  },

  es: {
    title: "Notelink · Escribe tus cuentas, guarda tus enlaces",
    meta: "Un bloc de notas que suma solo y guarda los enlaces que copias.",
    langLabel: "Idioma",
    themeD: "Cambiar a modo oscuro",
    themeL: "Cambiar a modo claro",

    /* Hero */
    h1a: "Escribe tus cuentas,",
    h1b: "guarda tus enlaces",
    sub: "Un bloc de notas que suma solo. Cada línea tiene su resultado al lado, y los enlaces que copias quedan guardados con su precio.",
    dl: "Descargar app",
    plansbtn: "Ver planes ↓",

    /* Phone demos */
    c1: "# un bloc que hace las cuentas",
    demo: "# demo · así se ve por dentro",
    cap1: "nota · el total se calcula solo",
    cap2: "portapapeles · enlaces con precio",
    clip: "Portapapeles",
    oct: "Octubre",
    trip: "Viaje",
    shop: "Compras",
    spent: "Gastos",
    balance: "Saldo",
    save: "Guardar enlaces al copiar",
    lk1: "Zapatillas de running en oferta",
    lk2: "Mochila de viaje",
    lk3: "Cómo ahorrar dinero cada mes",
    lk4: "Receta de pasta cremosa",
    lk5: "Vuelos Madrid – Lima",
    lk6: "Tutorial de Flutter",
    t1: "Hace 1 h",
    t2: "Hace 2 h",
    t3: "Hace 3 h",
    yd: "Ayer",

    /* Features */
    inc: "# qué incluye",
    k1: "totales",
    k2: "enlaces",
    k3: "precios",
    k4: "balance",
    k5: "compartir",
    k6: "pestañas",
    v1: "escribe «total» y suma todo lo de arriba",
    v2: "lo que copias queda en Portapapeles",
    v3: "un enlace con precio se sugiere como gasto",
    v4: "presupuesto − total, al instante",
    v5: "mantén presionada una línea",
    v6: "una nota por cada tema",

    /* Plans */
    pl: "# planes",
    pick: "Elige tu plan.",
    basic: "Básico",
    rec: "Recomendado",
    f1: "✓ Hasta 7 líneas",
    f2: "✓ Hasta 3 enlaces guardados",
    f6: "✓ Solo dos pestañas",
    f3: "✓ Líneas ilimitadas",
    f4: "✓ Enlaces ilimitados",
    f8: "✓ Todas las funciones",

    /* FAQ */
    faq: "# preguntas",
    q1: "¿Qué es Notelink?",
    a1: "Es un bloc de notas que calcula. Escribes cada gasto en su línea, el resultado aparece al lado y una línea «Total» suma lo anterior.",
    q2: "¿Qué pasa con los enlaces que copio?",
    a2: "Se guardan en la pestaña fija Portapapeles, con miniatura, título y dominio. Si el enlace es de un producto con precio, te lo sugerimos como posible gasto y tú decides si entra a la nota.",
    q3: "¿Cuánto cuesta?",
    a3: "Básico cuesta $0.99 e incluye hasta 7 líneas y 3 enlaces. Pro cuesta $1.99 y no tiene límites.",
    q4: "¿Cómo comparto una línea?",
    a4: "Mantén presionada la línea: se enfoca y aparece un menú con Compartir, Copiar línea, Copiar resultado y Eliminar.",

    /* Blog */
    blogs: "Blog",
    blogk: "# novedades",
    blogh: "Lo último que se viene",
    blogsub: "Directo del repositorio: las funciones que vamos publicando, commit a commit.",
    blogmore: "Ver todas las novedades",
    blogl: "Ver menos",
    blogload: "Cargando novedades...",
    blogempty: "Todavía no hay novedades.",
    blogerr: "No se pudieron cargar las novedades. Abre la landing desde la web para verlas.",
    blogcommit: "Ver commit",
    tag_novedad: "Novedad",
    tag_ui: "Diseño",
    tag_pago: "Compras",
    tag_fix: "Arreglo",

    /* Footer */
    tryit: "pruébala",
    now: "ahora",
    priv: "Privacidad",
    terms: "Términos",
  },
};

/** Lines typed by the note animation, in order, one per numbered row. */
const NOTE_LINES = {
  en: [
    "October expenses",
    "Rent 450",
    "Groceries 82.50",
    "Gas 40 + 35",
    "Netflix 12",
    "Coffee 3.20 × 8",
    "Total",
    "Salary 1200 − Total",
    "",
    "",
  ],
  es: [
    "Gastos de octubre",
    "Alquiler 450",
    "Súper 82.50",
    "Gasolina 40 + 35",
    "Netflix 12",
    "Café 3.20 × 8",
    "Total",
    "Sueldo 1200 − Total",
    "",
    "",
  ],
};

let lang = DEFAULT_LANG;
const listeners = [];

function detectLang() {
  try {
    const fromUrl = new URLSearchParams(location.search).get("lang");
    if (SUPPORTED_LANGS.includes(fromUrl)) return fromUrl;

    const stored = localStorage.getItem("lang");
    if (SUPPORTED_LANGS.includes(stored)) return stored;
  } catch (error) {
    /* ignore unavailable storage */
  }

  return DEFAULT_LANG;
}

export function getLang() {
  return lang;
}

export function t(key) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG];
  const value = dict[key];
  if (value != null) return value;
  return TRANSLATIONS[DEFAULT_LANG][key] ?? "";
}

export function getNoteLines() {
  return NOTE_LINES[lang] || NOTE_LINES[DEFAULT_LANG];
}

export function onLangChange(listener) {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index !== -1) listeners.splice(index, 1);
  };
}

function updateThemeLabel() {
  const button = document.querySelector("[data-theme-btn]");
  if (!button) return;

  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  button.setAttribute("aria-label", t(isDark ? "themeL" : "themeD"));
}

export function applyTranslations() {
  document.querySelectorAll("[data-t]").forEach((element) => {
    const value = t(element.getAttribute("data-t"));
    element.textContent = value;
  });

  document.querySelectorAll("[data-th]").forEach((element) => {
    const title = t("lk" + element.getAttribute("data-th"));
    element.textContent = title ? title.charAt(0) : "";
  });

  document.documentElement.lang = lang;
  document.title = t("title");

  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", t("meta"));

  const langGroup = document.querySelector(".lang");
  if (langGroup) langGroup.setAttribute("aria-label", t("langLabel"));

  document.querySelectorAll(".lang button").forEach((button) => {
    const pressed = button.getAttribute("data-lang") === lang;
    button.setAttribute("aria-pressed", pressed ? "true" : "false");
  });

  updateThemeLabel();
}

export function setLang(nextLang) {
  if (!SUPPORTED_LANGS.includes(nextLang) || nextLang === lang) return;

  lang = nextLang;

  try {
    localStorage.setItem("lang", lang);
  } catch (error) {
    /* ignore unavailable storage */
  }

  applyTranslations();
  listeners.forEach((listener) => listener(lang));
}

export function initI18n() {
  lang = detectLang();

  document.querySelectorAll(".lang button").forEach((button) => {
    button.addEventListener("click", () => setLang(button.getAttribute("data-lang")));
  });

  applyTranslations();
}
