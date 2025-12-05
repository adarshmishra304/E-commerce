// Utility functions for localStorage
function getUser() {
  const raw = localStorage.getItem("hostelUser");
  return raw ? JSON.parse(raw) : null;
}

function getCart() {
  const raw = localStorage.getItem("cartItems");
  return raw ? JSON.parse(raw) : [];
}

function setCart(cart) {
  localStorage.setItem("cartItems", JSON.stringify(cart));
}

function getOrders() {
  const raw = localStorage.getItem("orders");
  return raw ? JSON.parse(raw) : [];
}

function setOrders(orders) {
  localStorage.setItem("orders", JSON.stringify(orders));
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove("hidden");
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.classList.add("hidden"), 200);
  }, 1500);
}

function requireLogin() {
  const user = getUser();
  if (!user) {
    alert("Please login first.");
    window.location.href = "login.html";
  }
}

function renderCartCount() {
  const cartCountEl = document.getElementById("cartCount");
  if (!cartCountEl) return;
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = count;
}

function addToCart(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find((item) => item.productId === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }
  setCart(cart);
  renderCartCount();
  showToast(`${product.name} added to cart`);
}

function buyNow(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const orders = getOrders();
  orders.push({
    productId: productId,
    quantity: 1,
    purchasedAt: new Date().toISOString(),
  });
  setOrders(orders);

  showToast(`You claimed/bought 1 x ${product.name}`);
}

function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  PRODUCTS.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card product-card";

    card.innerHTML = `
      <div>
        <div class="product-title">${product.name}</div>
        <div class="product-meta">
          <span class="product-price">₹${product.price}</span>
          <span class="product-tag">${product.category}</span>
        </div>
        <p class="muted-text" style="margin-top:6px;">${product.description}</p>
      </div>
      <div class="product-actions">
        <button class="btn-secondary btn-small" data-add-cart="${product.id}">Add to Cart</button>
        <button class="btn btn-small" data-buy-now="${product.id}">Buy Now</button>
      </div>
    `;

    grid.appendChild(card);
  });

  grid.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;

    const cartId = target.getAttribute("data-add-cart");
    const buyId = target.getAttribute("data-buy-now");

    if (cartId) {
      addToCart(Number(cartId));
    } else if (buyId) {
      buyNow(Number(buyId));
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  requireLogin();
  renderCartCount();
  renderProducts();
});
