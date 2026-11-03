/* Haoyuan Bo — portfolio interactions
   Bilingual toggle (zh default / en), sticky nav, scroll reveal, active section.
   No dependencies. */

(function () {
  "use strict";

  var html = document.documentElement;
  var STORE_KEY = "hb-lang";

  var TITLES = {
    zh: "薄皓元 Haoyuan Bo — AI 全栈工程师 · Agent 与浏览器扩展",
    en: "Haoyuan Bo — AI Full-Stack Engineer · Agent Runtime & Browser Extensions"
  };
  var DESCS = {
    zh: "薄皓元（Haoyuan Bo），2027 届计算机科学与技术本科生。做 AI Agent 运行时、浏览器扩展和可以点开验证的 Web 产品。",
    en: "Haoyuan Bo — 2027 computer-science undergraduate building agent runtimes, browser extensions and web products you can verify in a repository."
  };

  /* ---------- remember the Chinese originals before touching anything ---------- */
  var nodes = Array.prototype.slice.call(
    document.querySelectorAll("[data-en], [data-en-html]")
  );
  nodes.forEach(function (el) {
    el.dataset.zhHtml = el.innerHTML;
  });

  function applyLang(lang) {
    var en = lang === "en";

    nodes.forEach(function (el) {
      if (en && el.hasAttribute("data-en-html")) {
        el.innerHTML = el.getAttribute("data-en-html");
      } else if (en) {
        el.textContent = el.getAttribute("data-en");
      } else {
        el.innerHTML = el.dataset.zhHtml;
      }
    });

    html.setAttribute("lang", en ? "en" : "zh-CN");
    document.title = en ? TITLES.en : TITLES.zh;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", en ? DESCS.en : DESCS.zh);

    var zhBtn = document.getElementById("lang-zh");
    var enBtn = document.getElementById("lang-en");
    if (zhBtn) zhBtn.setAttribute("aria-pressed", String(!en));
    if (enBtn) enBtn.setAttribute("aria-pressed", String(en));

    try { localStorage.setItem(STORE_KEY, lang); } catch (e) { /* private mode */ }
  }

  var saved = null;
  try { saved = localStorage.getItem(STORE_KEY); } catch (e) { /* ignore */ }

  var fromUrl = null;
  try {
    var q = new URLSearchParams(window.location.search).get("lang");
    if (q === "en" || q === "zh") fromUrl = q;
  } catch (e) { /* ignore */ }

  applyLang(fromUrl || (saved === "en" ? "en" : "zh"));

  var zhBtn = document.getElementById("lang-zh");
  var enBtn = document.getElementById("lang-en");
  if (zhBtn) zhBtn.addEventListener("click", function () { applyLang("zh"); });
  if (enBtn) enBtn.addEventListener("click", function () { applyLang("en"); });

  /* ---------- sticky nav ---------- */
  var nav = document.getElementById("nav");
  var onScroll = function () {
    if (!nav) return;
    if (window.scrollY > 24) nav.classList.add("is-stuck");
    else nav.classList.remove("is-stuck");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- scroll reveal ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var staticMode = false;
  try {
    staticMode = new URLSearchParams(window.location.search).get("static") === "1";
  } catch (e) { /* ignore */ }

  if (staticMode) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else if (reduced || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- highlight the section you are reading ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          var on = a.getAttribute("href") === "#" + entry.target.id;
          if (on) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
