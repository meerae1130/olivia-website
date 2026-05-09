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
