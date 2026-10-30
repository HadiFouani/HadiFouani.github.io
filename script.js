"use strict";

const themeControls = document.getElementById("theme-controls");
const themeButtons = Array.from(document.querySelectorAll("[data-theme-choice]"));
const themeStorageKey = "portfolio-theme";
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let currentTheme = document.documentElement.dataset.theme || "system";

function applyTheme(theme) {
  currentTheme = theme;
  if (theme === "system") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
  themeButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.themeChoice === theme)));
  const isDark = theme === "dark" || (theme === "system" && systemTheme.matches);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isDark ? "#0c1016" : "#f6f8fb");
  const logoSource = `assets/logo-astra-${isDark ? "dark" : "light"}.svg`;
  document.getElementById("brand-logo")?.setAttribute("src", logoSource);
  document.querySelector('link[rel="icon"]')?.setAttribute("href", `${logoSource}?v=2`);
}
try {
  const saved = localStorage.getItem(themeStorageKey);
  if (["light", "dark", "system"].includes(saved)) currentTheme = saved;
} catch { /* Appearance works without persistent storage. */ }
applyTheme(currentTheme);
if (themeControls) themeControls.hidden = false;
themeButtons.forEach(button => button.addEventListener("click", () => {
  applyTheme(button.dataset.themeChoice);
  try { localStorage.setItem(themeStorageKey, currentTheme); }
  catch { /* The choice remains active for this visit. */ }
}));
systemTheme.addEventListener("change", () => {
  if (currentTheme === "system") applyTheme("system");
});

const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const sections = navLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);
const sidebar = document.querySelector(".sidebar");
const progress = document.querySelector(".scroll-progress");
let scrollQueued = false;
let navOffset = 0;
function updateNavOffset() {
  navOffset = window.innerWidth <= 700 ? sidebar.getBoundingClientRect().height + 16 : 32;
  document.documentElement.style.setProperty("--nav-offset", `${navOffset}px`);
}
if ("ResizeObserver" in window) new ResizeObserver(updateNavOffset).observe(sidebar);
function updateNavigation() {
  const threshold = navOffset + 35;
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= threshold) current = section;
  }
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  if (window.scrollY >= scrollable - 5) current = sections[sections.length - 1];
  navLinks.forEach(link => {
    const active = current && link.getAttribute("href") === `#${current.id}`;
    link.classList.toggle("active", Boolean(active));
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  if (progress) progress.style.transform = `scaleX(${scrollable > 0 ? Math.max(0, Math.min(1, window.scrollY / scrollable)) : 0})`;
  scrollQueued = false;
}
function queueNavigationUpdate() {
  if (!scrollQueued) {
    scrollQueued = true;
    requestAnimationFrame(updateNavigation);
  }
}
window.addEventListener("scroll", queueNavigationUpdate, { passive: true });
window.addEventListener("resize", () => { updateNavOffset(); queueNavigationUpdate(); });
updateNavOffset();
updateNavigation();

const filters = document.querySelector(".project-filters");
const projectCards = Array.from(document.querySelectorAll(".project-card"));
if (filters) {
  filters.hidden = false;
  filters.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
    filters.querySelectorAll("button").forEach(option => option.setAttribute("aria-pressed", String(option === button)));
    let visible = 0;
    projectCards.forEach(card => {
      card.hidden = button.dataset.filter !== "all" && card.dataset.category !== button.dataset.filter;
      if (!card.hidden) visible++;
    });
    document.getElementById("project-status").textContent = `${visible} ${visible === 1 ? "project" : "projects"} shown`;
    queueNavigationUpdate();
  }));
}

// Content is visible by default; animation is a progressive enhancement.
const revealTargets = document.querySelectorAll(".section-heading, .about-grid, .work-card, .project-card, .experience-row, .interest-list, .reading-entry");
let revealObserver;
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("reveal-pending");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });
  revealTargets.forEach(target => {
    target.classList.add("reveal-pending");
    revealObserver.observe(target);
  });
}
reducedMotion.addEventListener("change", () => {
  if (reducedMotion.matches) {
    revealObserver?.disconnect();
    revealTargets.forEach(target => target.classList.remove("reveal-pending"));
  }
});

// A soft response to clicks; keyboard activation keeps its native focus feedback.
document.querySelectorAll(".button, .theme-option, .project-filters button").forEach(control => {
  control.addEventListener("click", event => {
    if (reducedMotion.matches || event.detail === 0) return;
    const bounds = control.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "click-ripple";
    ripple.setAttribute("aria-hidden", "true");
    ripple.style.left = `${event.clientX - bounds.left}px`;
    ripple.style.top = `${event.clientY - bounds.top}px`;
    control.append(ripple);
    ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
  });
});
const researchArt = document.querySelector(".research-art");
researchArt?.addEventListener("pointermove", event => {
  if (reducedMotion.matches || event.pointerType !== "mouse") return;
  const bounds = researchArt.getBoundingClientRect();
  researchArt.style.setProperty("--art-turn", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 12}deg`);
});
researchArt?.addEventListener("pointerleave", () => researchArt.style.setProperty("--art-turn", "0deg"));
document.querySelectorAll("details").forEach(detail => detail.addEventListener("toggle", queueNavigationUpdate));
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
