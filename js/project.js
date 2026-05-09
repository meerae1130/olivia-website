// ============================================================
// project.js — Product/project detail page logic
// Reads ?id= from the URL and renders the matching project
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  /* ── Get project id from URL ── */
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);
  const projects = window.PROJECTS;
  const project = projects.find((p) => p.id === id);

  /* Redirect home if not found */
  if (!project) {
    window.location.href = "../index.html";
    return;
  }

  /* ── Populate header dropdown menus ── */
  const info = window.PERSONAL_INFO;

  // Work dropdown - list all projects
  const workDropdown = document.getElementById("work-dropdown");
  projects.forEach((proj) => {
    const link = document.createElement("a");
    link.href = `project.html?id=${proj.id}`;
    link.textContent = proj.title;
    workDropdown.appendChild(link);
  });

  // Contact dropdown - list all contact methods
  const contactDropdown = document.getElementById("contact-dropdown");
  const contactMethods = [
    { label: "Email", url: `mailto:${info.email}` },
    { label: "LinkedIn", url: `https://${info.linkedin}` },
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

  /* ── Populate page title (browser tab) ── */
  document.title = `${project.title} — Olivia Ahn`;

  /* ── Breadcrumb ── */
  document.getElementById("breadcrumb-title").textContent = project.title;

  /* ── Left image panel (multi-image support) ── */
  const images = project.images || (project.image ? [project.image] : []);
  let currentImageIndex = 0;

  const mainImage = document.getElementById("main-image");
  const imagePlaceholder = document.getElementById("image-placeholder");
  const previewsContainer = document.getElementById("product-image-previews");
  const prevBtn = document.getElementById("image-prev");
  const nextBtn = document.getElementById("image-next");

  // Populate preview gallery
  if (images.length > 0) {
    images.forEach((img, index) => {
      const preview = document.createElement("div");
      preview.className = `product-image-preview ${index === 0 ? "active" : ""}`;
      preview.innerHTML = `<img src="../${img}" alt="Preview ${index + 1}" />`;
      preview.addEventListener("click", () => showImage(index));
      previewsContainer.appendChild(preview);
    });
    imagePlaceholder.style.display = "none";
    mainImage.style.display = "block";
    prevBtn.style.display = images.length > 1 ? "flex" : "none";
    nextBtn.style.display = images.length > 1 ? "flex" : "none";
  } else {
    mainImage.style.display = "none";
    imagePlaceholder.style.display = "flex";
  }

  // Show image by index
  function showImage(index) {
    currentImageIndex = index;
    const imgPath = `../${images[index]}`;
    mainImage.src = imgPath;

    // Update preview active state
    document.querySelectorAll(".product-image-preview").forEach((p, i) => {
      p.classList.toggle("active", i === index);
    });

    // Scroll preview into view
    const previews = document.querySelectorAll(".product-image-preview");
    if (previews[index]) {
      previewsContainer.scrollLeft = previews[index].offsetLeft - 8;
    }
  }

  // Navigation handlers
  prevBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(currentImageIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex);
  });

  // Initialize with first image
  if (images.length > 0) {
    showImage(0);
  }

  /* ── Title, subtitle, date ── */
  document.getElementById("product-title").textContent = project.title;
  document.getElementById("product-subtitle").textContent = project.subtitle;
  document.getElementById("product-date").textContent = `$ ${project.date}`;

  /* ── Platform links (GitHub, etc.) ── */
  const linksContainer = document.getElementById("product-links");
  if (project.links.length === 0) {
    linksContainer.outerHTML = `<p class="product-no-links">No external links available.</p>`;
  } else {
    project.links.forEach((link) => {
      const a = document.createElement("a");
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("aria-label", link.label);
      a.className = "product-link-btn";
      a.innerHTML = getIconSVG(link.icon);
      linksContainer.appendChild(a);
    });
  }

  /* ── Description ── */
  document.getElementById("product-description").textContent = project.description;

  /* ── Add to bag ── */
  const bagBtn = document.getElementById("btn-add-to-bag");
  updateBagBtn();
  bagBtn.addEventListener("click", () => {
    if (Cart.has(project.id)) {
      Cart.remove(project.id);
    } else {
      Cart.add(project);
    }
    updateBagBtn();
  });
  window.addEventListener("cart-updated", () => {
    updateBagBtn();
    updateCartBadge();
  });

  function updateBagBtn() {
    const inCart = Cart.has(project.id);
    bagBtn.textContent = inCart ? "Remove from Bag" : "Add to Bag";
    bagBtn.classList.toggle("in-cart", inCart);
  }

  /* ── Cart badge ── */
  updateCartBadge();

  /* ── Next project ── */
  const currentIndex = projects.findIndex((p) => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  if (nextProject && nextProject.id !== id) {
    const card = document.getElementById("next-project-card");
    card.innerHTML = `
      <div class="next-project-thumb">
        ${nextProject.image
        ? `<img src="../${nextProject.image}" alt="${nextProject.title}" />`
        : ``
      }
      </div>
      <div class="next-project-info">
        <h4>${nextProject.title}</h4>
        <p>${nextProject.subtitle}</p>
      </div>
      <div class="next-arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </div>
    `;
    card.addEventListener("click", () => {
      window.location.href = `project.html?id=${nextProject.id}`;
    });
  } else {
    /* No next project — hide the section */
    document.getElementById("next-project-section").style.display = "none";
  }
});

/* ── Cart badge updater ── */
function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  const count = Cart.count();
  badge.textContent = count;
  badge.classList.toggle("visible", count > 0);
}

/* ── Icon SVG helper ── */
function getIconSVG(type) {
  const icons = {
    github: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
    </svg>`,
    external: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>`,
    figma: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 5.5A3.5 3.5 0 018.5 2H12v7H8.5A3.5 3.5 0 015 5.5z"/>
      <path d="M12 2h3.5a3.5 3.5 0 110 7H12V2z"/>
      <path d="M12 12.5a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"/>
      <path d="M5 19.5A3.5 3.5 0 018.5 16H12v3.5a3.5 3.5 0 11-7 0z"/>
      <path d="M5 12.5A3.5 3.5 0 018.5 9H12v7H8.5A3.5 3.5 0 015 12.5z"/>
    </svg>`,
    linkedin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>`,
    bng: "BnG"
  };
  /* Default to external link icon */
  return icons[type] || icons.external;
}
