"use strict";

const themeSelect = document.getElementById("theme-select");
const themeControls = document.getElementById("theme-controls");
const themeStorageKey = "portfolio-theme";

function applyTheme(theme) {
  if (theme === "light" || theme === "dark") {
    document.documentElement.dataset.theme = theme;
  } else {
    delete document.documentElement.dataset.theme;
  }
}

if (themeSelect && themeControls) {
  let theme = document.documentElement.dataset.theme || "system";
  try {
    const saved = localStorage.getItem(themeStorageKey);
    if (["light", "dark", "system"].includes(saved)) theme = saved;
  } catch { /* Storage is optional. */ }
  applyTheme(theme);
  themeSelect.value = theme;
  themeControls.hidden = false;
  themeSelect.addEventListener("change", () => {
    applyTheme(themeSelect.value);
    try { localStorage.setItem(themeStorageKey, themeSelect.value); }
    catch { /* Selection still works for the current visit. */ }
  });
}

const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const sections = navLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);
let scrollQueued = false;
function updateNavigation() {
  // Match the active section to the space below the mobile navigation.
  const threshold = window.innerWidth <= 700 ? 155 : 110;
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= threshold) current = section;
  }
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 5) {
    current = sections[sections.length - 1];
  }
  navLinks.forEach(link => {
    const active = current && link.getAttribute("href") === `#${current.id}`;
    link.classList.toggle("active", Boolean(active));
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  scrollQueued = false;
}
function queueNavigationUpdate() {
  if (!scrollQueued) {
    scrollQueued = true;
    requestAnimationFrame(updateNavigation);
  }
}
window.addEventListener("scroll", queueNavigationUpdate, { passive: true });
window.addEventListener("resize", queueNavigationUpdate);
updateNavigation();
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
