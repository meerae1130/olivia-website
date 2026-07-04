// ============================================================
// cart.js — Shared shopping cart state (sessionStorage)
// ============================================================

const Cart = {
  /* ── Read ── */
  get() {
    return JSON.parse(sessionStorage.getItem("ahn_cart") || "[]");
  },

  /* ── Write ── */
  save(items) {
    sessionStorage.setItem("ahn_cart", JSON.stringify(items));
    Cart._dispatch();
  },

  /* ── Add project to cart ── */
  add(project) {
    const items = Cart.get();
    if (!items.find((i) => i.id === project.id)) {
      items.push({ id: project.id, title: project.title, date: project.date, image: project.image });
      Cart.save(items);
    }
  },

  /* ── Remove project from cart ── */
  remove(id) {
    Cart.save(Cart.get().filter((i) => i.id !== id));
  },

  /* ── Check if project is in cart ── */
  has(id) {
    return Cart.get().some((i) => i.id === id);
  },

  /* ── Count ── */
  count() {
    return Cart.get().length;
  },

  /* ── Fire custom event so header badge updates ── */
  _dispatch() {
    window.dispatchEvent(new Event("cart-updated"));
  },
};

window.Cart = Cart;

document.addEventListener("DOMContentLoaded", () => {
  /* ── Populate header dropdown menus ── */
  const info = window.PERSONAL_INFO;
  const projects = window.PROJECTS;
  const isPagesRoute = window.location.pathname.includes("/pages/");

  // Work dropdown - list all projects
  const workDropdown = document.getElementById("work-dropdown");
  if (workDropdown) {
    workDropdown.innerHTML = "";
    projects.forEach((project) => {
      const link = document.createElement("a");
      link.href = `${isPagesRoute ? "" : "pages/"}project.html?id=${project.id}`;
      link.textContent = project.title;
      workDropdown.appendChild(link);
    });
  }

  // Contact dropdown - list all contact methods
  const contactDropdown = document.getElementById("contact-dropdown");
  if (contactDropdown) {
    const contactMethods = [
      { label: "Email", url: `mailto:${info.email}` },
      { label: "LinkedIn", url: info.linkedin },
      { label: "GitHub", url: info.github },
      { label: "Instagram", url: info.instagram },
    ];
    contactMethods.forEach((method) => {
      const link = document.createElement("a");
      link.href = method.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = method.label;
      contactDropdown.appendChild(link);
    });
  }
});

function initHeaderScrollToggle() {
  const header = document.getElementById('site-header');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateHeader() {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;

    if (Math.abs(delta) < 10) {
      ticking = false;
      return;
    }

    if (currentScrollY <= 0 || delta < 0) {
      header.classList.remove('header-hidden');
    } else if (delta > 0) {
      header.classList.add('header-hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });
}

document.addEventListener('DOMContentLoaded', initHeaderScrollToggle);
