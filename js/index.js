// ============================================================
// index.js — Main page logic
// Renders the projects grid and sets personal info links
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);

  /* ── Populate contact links from data.js ── */
  const info = window.PERSONAL_INFO;
  document.getElementById("link-linkedin").href = info.linkedin;
  document.getElementById("link-github").href = info.github;
  document.getElementById("link-instagram").href = info.instagram;
  document.getElementById("link-email").href = `mailto:${info.email}`;
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ── Populate header dropdown menus ── */
  const projects = window.PROJECTS;

  // Work dropdown - list all projects
  const workDropdown = document.getElementById("work-dropdown");
  workDropdown.innerHTML = "";

  projects.forEach((project) => {
    const link = document.createElement("a");
    link.href = `pages/project.html?id=${project.id}`;
    link.textContent = project.title;
    workDropdown.appendChild(link);
  });

  // Contact dropdown - list all contact methods
  const contactDropdown = document.getElementById("contact-dropdown");
  contactDropdown.innerHTML = "";

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

  /* ── Cart badge ── */
  updateCartBadge();
  window.addEventListener("cart-updated", updateCartBadge);
  /* ── About carousel arrows ── */
  const aboutCarousel = document.getElementById("about-carousel");
  const aboutPrev = document.getElementById("about-prev");
  const aboutNext = document.getElementById("about-next");

  if (aboutCarousel && aboutPrev && aboutNext) {
    aboutPrev.addEventListener("click", () => {
      aboutCarousel.scrollBy({
        left: -aboutCarousel.clientWidth * 0.75,
        behavior: "smooth",
      });
    });

    aboutNext.addEventListener("click", () => {
      aboutCarousel.scrollBy({
        left: aboutCarousel.clientWidth * 0.75,
        behavior: "smooth",
      });
    });
  }

  /* ── Render projects grid ── */
  const grid = document.getElementById("projects-grid");

  projects.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.setAttribute("data-id", project.id);
    card.innerHTML = `
      <div class="project-card-img">
        ${project.image
        ? `<img src="${"assets/battery/cover.png"}" alt="${project.title}" loading="lazy" />`
        : `<span class="placeholder-label">Image Placeholder</span>`
      }
        <span class="tag-new">New</span>
      </div>
      <div class="project-card-info">
        <h3>${project.title}</h3>
        <p class="card-sub">${project.subtitle}</p>
        <p class="card-date">$ ${project.date}</p>
      </div>
    `;
    // Navigate to product page on click
    card.addEventListener("click", () => {
      window.location.href = `pages/project.html?id=${project.id}`;
    });
    grid.appendChild(card);
  });

  /* ── Coming soon card (always shown at end) ── */
  const comingSoon = document.createElement("div");
  comingSoon.innerHTML = `
    <div class="coming-soon-card">
      <span>Coming Soon</span>
    </div>
  `;
  grid.appendChild(comingSoon);

  /* ── Scroll reveal ── */
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => observer.observe(el));
});

/* ── Update cart badge count ── */
function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  const count = window.Cart.count();
  badge.textContent = count;
  badge.classList.toggle("visible", count > 0);
}
