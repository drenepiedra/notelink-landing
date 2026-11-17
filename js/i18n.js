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
    meta: "A notepad that adds things up, tracks income and balance, saves your links, and plans bills, debts and stats.",
    langLabel: "Language",
    themeD: "Switch to dark mode",
    themeL: "Switch to light mode",

    /* Hero */
    h1a: "Write your math,",
    h1b: "save your links",
    sub: "A notepad that adds things up, keeps income and balance in check, and saves the links you copy. Plus calendar reminders, debts and stats.",
    dl: "Download app",
    plansbtn: "See plans ↓",

    /* Phone demos */
    c1: "# a notepad that does the math",
    demo: "# demo · the whole app in motion",
    cap1: "note · math, income and comments",
    cap2: "clipboard · links saved by themselves",
    cap3: "calendar · bills and subscriptions",
    cap4: "insights · stats and debts",
    clip: "Clipboard",
    oct: "October",
    trip: "Trip",
    shop: "Shopping",
    spent: "Spent",
    income: "Income",
    balance: "Balance",
    save: "Save links when copied",
    toolZoom: "Aa 120%",
    toolCards: "Cards",
    whatifq: "? Can I afford it?",
    whatifa: "It fits ✓",
    copiedtoast: "Link copied · saved to Clipboard",
    catall: "All",
    catshop: "Shopping",
    cattravel: "Travel",
    catwork: "Work",
    catrecipe: "Recipe",
    pinned: "Pinned",
    todaylabel: "Today",
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

    /* Calendar */
    caltitle: "Calendar",
    calmonth: "November 2026",
    w1: "M",
    w2: "T",
    w3: "W",
    w4: "T",
    w5: "F",
    w6: "S",
    w7: "S",
    planned: "Planned",
    entrent: "Rent",
    entryrentmeta: "Nov 1 · monthly",
    entsalary: "Salary",
    entrysalarymeta: "Nov 5 · monthly",
    subs: "Subscriptions",
    submonth: "Monthly",
    subnetflix: "Netflix",
    subspotify: "Spotify",
    calrem: "Reminder · 2 days before",

    /* Insights */
    institle: "Insights",
    insthis: "October",
    tocollect: "To collect",
    topay: "To pay",
    net: "Net",
    debt1: "Ana",
    debt1meta: "Dinner",
    debt2: "Luis",
    debt2meta: "Tickets",
    statstitle: "Statistics",
    statline: "Rent is 68% of your spending",
    statrent: "Rent",
    statgroceries: "Groceries",
    statgas: "Gas",
    statcoffee: "Coffee",
    exportpill: "Export JSON",
    searchpill: "Search notes",

    /* Features */
    inc: "# what you get",
    k1: "totals",
    k2: "income",
    k3: "comments",
    k4: "sections",
    k5: "units",
    k6: "links",
    k7: "prices",
    k8: "stats",
    k9: "calendar",
    k10: "debts",
    k11: "backup",
    k12: "gestures",
    k13: "style",
    v1: "type “total” and it adds up everything above",
    v2: "start a line with + and the balance follows",
    v3: "// leaves a note without touching the math",
    v4: "# folds long lists into collapsible blocks",
    v5: "units and currencies understood as you type",
    v6: "what you copy lands in Clipboard with its price",
    v7: "a link with a price is suggested as an expense",
    v8: "see how much each line weighs in your spending",
    v9: "planned expenses, subscriptions and reminders",
    v10: "who owes you and who you owe, settled in a tap",
    v11: "export and import everything as a JSON file",
    v12: "swipe to edit or delete, hold for quick actions",
    v13: "one note per topic, dark mode, classic or cards",

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
    f9: "✓ Unlimited tabs",
    f10: "✓ Cards view",
    f8: "✓ All functions",

    /* FAQ */
    faq: "# faq",
    q1: "What is Notelink?",
    a1: "It's a notepad that calculates. You write each expense or income on its own line, the answer shows up beside it, and a “Total” line adds up the block while the footer keeps spent, income and balance in view.",
    q2: "What happens to the links I copy?",
    a2: "They're saved automatically in the pinned Clipboard tab, grouped by date and category, with a thumbnail, title and price when there is one. If it's a product with a price, we suggest it as a possible expense.",
    q3: "How much does it cost?",
    a3: "Basic costs $0.99 and includes up to 7 lines, 3 links and 2 tabs. Pro costs $1.99 and removes every limit, with unlimited tabs and the Cards view.",
    q4: "How do I share a line?",
    a4: "Press and hold the line: it comes into focus and a menu appears with Share, Copy line, Copy result, Statistics and Delete.",
    q5: "Can I plan bills and back up my notes?",
    a5: "Yes. The calendar holds planned expenses, income, monthly subscriptions and reminders two days before, and you can export or import all your notes, links, debts and settings as a JSON backup.",

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
    postmore: "View more",
    postless: "View less",
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
    meta: "Un bloc que suma solo, controla ingresos y saldo, guarda tus enlaces y organiza facturas, deudas y estadísticas.",
    langLabel: "Idioma",
    themeD: "Cambiar a modo oscuro",
    themeL: "Cambiar a modo claro",

    /* Hero */
    h1a: "Escribe tus cuentas,",
    h1b: "guarda tus enlaces",
    sub: "Un bloc que suma solo, controla ingresos y saldo y guarda los enlaces que copias. Además: calendario, deudas y estadísticas.",
    dl: "Descargar app",
    plansbtn: "Ver planes ↓",

    /* Phone demos */
    c1: "# un bloc que hace las cuentas",
    demo: "# demo · toda la app en movimiento",
    cap1: "nota · cuentas, ingresos y comentarios",
    cap2: "portapapeles · enlaces que se guardan solos",
    cap3: "calendario · facturas y suscripciones",
    cap4: "resumen · estadísticas y deudas",
    clip: "Portapapeles",
    oct: "Octubre",
    trip: "Viaje",
    shop: "Compras",
    spent: "Gastos",
    income: "Ingresos",
    balance: "Saldo",
    save: "Guardar enlaces al copiar",
    toolZoom: "Aa 120%",
    toolCards: "Tarjetas",
    whatifq: "? ¿Me alcanza?",
    whatifa: "Sí alcanza ✓",
    copiedtoast: "Enlace copiado · guardado en Portapapeles",
    catall: "Todos",
    catshop: "Compras",
    cattravel: "Viajes",
    catwork: "Trabajo",
    catrecipe: "Recetas",
    pinned: "Fijados",
    todaylabel: "Hoy",
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

    /* Calendar */
    caltitle: "Calendario",
    calmonth: "Noviembre 2026",
    w1: "L",
    w2: "M",
    w3: "X",
    w4: "J",
    w5: "V",
    w6: "S",
    w7: "D",
    planned: "Previstos",
    entrent: "Alquiler",
    entryrentmeta: "1 nov · mensual",
    entsalary: "Sueldo",
    entrysalarymeta: "5 nov · mensual",
    subs: "Suscripciones",
    submonth: "Mensual",
    subnetflix: "Netflix",
    subspotify: "Spotify",
    calrem: "Recordatorio · 2 días antes",

    /* Insights */
    institle: "Resumen",
    insthis: "Octubre",
    tocollect: "Por cobrar",
    topay: "Por pagar",
    net: "Neto",
    debt1: "Ana",
    debt1meta: "Cena",
    debt2: "Luis",
    debt2meta: "Entradas",
    statstitle: "Estadísticas",
    statline: "El alquiler es el 68% de tus gastos",
    statrent: "Alquiler",
    statgroceries: "Súper",
    statgas: "Gasolina",
    statcoffee: "Café",
    exportpill: "Exportar JSON",
    searchpill: "Buscar notas",

    /* Features */
    inc: "# qué incluye",
    k1: "totales",
    k2: "ingresos",
    k3: "comentarios",
    k4: "secciones",
    k5: "unidades",
    k6: "enlaces",
    k7: "precios",
    k8: "estadísticas",
    k9: "calendario",
    k10: "deudas",
    k11: "copia",
    k12: "gestos",
    k13: "estilo",
    v1: "escribe «total» y suma todo lo de arriba",
    v2: "empieza con + y el saldo se ajusta solo",
    v3: "// deja una nota sin tocar las cuentas",
    v4: "# pliega listas largas en bloques colapsables",
    v5: "unidades y monedas entendidas al escribir",
    v6: "lo que copias cae en Portapapeles con su precio",
    v7: "un enlace con precio se sugiere como gasto",
    v8: "mira cuánto pesa cada línea en tus gastos",
    v9: "gastos previstos, suscripciones y recordatorios",
    v10: "quién te debe y a quién debes, saldado al toque",
    v11: "exporta e importa todo en un archivo JSON",
    v12: "desliza para editar o borrar, mantén para más",
    v13: "una nota por tema, modo oscuro, clásica o tarjetas",

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
    f9: "✓ Pestañas ilimitadas",
    f10: "✓ Vista de tarjetas",
    f8: "✓ Todas las funciones",

    /* FAQ */
    faq: "# preguntas",
    q1: "¿Qué es Notelink?",
    a1: "Es un bloc que calcula. Escribes cada gasto o ingreso en su línea, el resultado aparece al lado y una línea «Total» suma el bloque mientras el pie mantiene a la vista gastos, ingresos y saldo.",
    q2: "¿Qué pasa con los enlaces que copio?",
    a2: "Se guardan solos en la pestaña fija Portapapeles, agrupados por fecha y categoría, con miniatura, título y precio cuando lo hay. Si es un producto con precio, te lo sugerimos como posible gasto.",
    q3: "¿Cuánto cuesta?",
    a3: "Básico cuesta $0.99 e incluye hasta 7 líneas, 3 enlaces y 2 pestañas. Pro cuesta $1.99 y quita todos los límites, con pestañas ilimitadas y vista de tarjetas.",
    q4: "¿Cómo comparto una línea?",
    a4: "Mantén presionada la línea: se enfoca y aparece un menú con Compartir, Copiar línea, Copiar resultado, Estadísticas y Eliminar.",
    q5: "¿Puedo planificar facturas y hacer copia de seguridad?",
    a5: "Sí. El calendario guarda gastos e ingresos previstos, suscripciones mensuales y recordatorios dos días antes, y puedes exportar o importar todas tus notas, enlaces, deudas y ajustes en un archivo JSON.",

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
    postmore: "Ver más",
    postless: "Ver menos",
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
    "Coffee 3.20 × 8",
    "// split with Ana",
    "# Subscriptions",
    "Netflix 12",
    "Spotify 9.99",
    "Paint 2.5 m × $4.20",
    "+ Salary 1200",
    "Total",
  ],
  es: [
    "Gastos de octubre",
    "Alquiler 450",
    "Súper 82.50",
    "Gasolina 40 + 35",
    "Café 3.20 × 8",
    "// a medias con Ana",
    "# Suscripciones",
    "Netflix 12",
    "Spotify 9.99",
    "Pintura 2.5 m × $4.20",
    "+ Sueldo 1200",
    "Total",
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
