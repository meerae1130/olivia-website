// ============================================================
// index.js — Main page logic
// Renders the projects grid and sets personal info links
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  /* ── Populate contact links from data.js ── */
  const info = window.PERSONAL_INFO;
  document.getElementById("link-linkedin").href   = info.linkedin;
  document.getElementById("link-github").href     = info.github;
  document.getElementById("link-instagram").href  = info.instagram;
  document.getElementById("link-email").href      = `mailto:${info.email}`;
  document.getElementById("year").textContent     = new Date().getFullYear();

  /* ── Cart badge ── */
  updateCartBadge();
  window.addEventListener("cart-updated", updateCartBadge);

  /* ── Render projects grid ── */
  const grid     = document.getElementById("projects-grid");
  const projects = window.PROJECTS;

  projects.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.setAttribute("data-id", project.id);
    card.innerHTML = `
      <div class="project-card-img">
        ${project.image
          ? `<img src="${project.image}" alt="${project.title}" loading="lazy" />`
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
  const observer  = new IntersectionObserver(
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
