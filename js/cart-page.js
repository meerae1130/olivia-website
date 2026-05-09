// ============================================================
// cart-page.js — Shopping cart page logic
// Renders cart items, generates email suggestion, opens mailto
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartBadge();
  window.addEventListener("cart-updated", () => {
    renderCart();
    updateCartBadge();
  });
});

/* ── Main render function ── */
function renderCart() {
  const items              = Cart.get();
  const itemsContainer     = document.getElementById("cart-items-container");
  const suggestionContainer = document.getElementById("email-suggestion-container");
  const checkoutContainer  = document.getElementById("checkout-container");

  /* ── Empty state ── */
  if (items.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty">
        <p>Your bag is empty.</p>
        <a href="../index.html#projects">Explore Work &rarr;</a>
      </div>
    `;
    suggestionContainer.innerHTML = "";
    checkoutContainer.innerHTML   = "";
    return;
  }

  /* ── Render cart items ── */
  itemsContainer.innerHTML = `
    <div class="cart-items">
      ${items.map((item) => `
        <div class="cart-item">
          <div class="cart-item-thumb">
            ${item.image
              ? `<img src="../${item.image}" alt="${item.title}" />`
              : ``
            }
          </div>
          <div class="cart-item-info">
            <h3>${item.title}</h3>
            <p class="cart-item-date">$ ${item.date}</p>
          </div>
          <button class="cart-item-remove" data-id="${item.id}">Remove</button>
        </div>
      `).join("")}
    </div>
  `;

  /* ── Wire up remove buttons ── */
  itemsContainer.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      Cart.remove(parseInt(btn.dataset.id, 10));
    });
  });

  /* ── Generate email suggestion ── */
  const emailBody = generateEmailSuggestion(items);
  const info      = window.PERSONAL_INFO;

  suggestionContainer.innerHTML = `
    <div class="email-suggestion">
      <p class="email-suggestion-label">Suggested message</p>
      <p class="email-suggestion-text" id="email-text">${emailBody}</p>
    </div>
  `;

  /* ── Checkout button ── */
  const subject = encodeURIComponent("Reaching out about your portfolio");
  const body    = encodeURIComponent(emailBody);
  const mailto  = `mailto:${info.email}?subject=${subject}&body=${body}`;

  checkoutContainer.innerHTML = `
    <a class="cart-checkout-btn" href="${mailto}">Send Email &mdash; Check Out</a>
  `;
}

/* ── Generate a recruiter-friendly email suggestion ── */
function generateEmailSuggestion(items) {
  const info     = window.PERSONAL_INFO;
  const titles   = items.map((i) => i.title);

  /* Format project list naturally */
  let projectList;
  if (titles.length === 1) {
    projectList = `"${titles[0]}"`;
  } else if (titles.length === 2) {
    projectList = `"${titles[0]}" and "${titles[1]}"`;
  } else {
    const last  = titles[titles.length - 1];
    const rest  = titles.slice(0, -1).map((t) => `"${t}"`).join(", ");
    projectList = `${rest}, and "${last}"`;
  }

  return (
    `Hi Olivia,\n\n` +
    `I came across your portfolio and was particularly impressed by your work on ${projectList}. ` +
    `The depth and creativity you brought to ${titles.length === 1 ? "this project" : "these projects"} really stood out to me.\n\n` +
    `I'd love to connect and learn more about your experience. ` +
    `Would you be open to a quick chat?\n\n` +
    `Looking forward to hearing from you!`
  );
}

/* ── Update cart badge ── */
function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  const count = Cart.count();
  badge.textContent = count;
  badge.classList.toggle("visible", count > 0);
}
