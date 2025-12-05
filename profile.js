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
  const el = document.getElementById("cartCountProfile");
  if (!el) return;
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  el.textContent = count;
}

function renderUserInfo() {
  const userInfoEl = document.getElementById("userInfo");
  const user = getUser();
  if (!user || !userInfoEl) return;

  userInfoEl.innerHTML = `
    <div class="list-item">
      <div class="list-item-main">
        <div class="list-item-title">${user.name}</div>
        <div class="list-item-sub">
          Room ${user.room}, Block ${user.block}<br/>
          Phone: ${user.phone}
        </div>
      </div>
      <span class="badge">Logged in</span>
    </div>
  `;
}

function renderCartItems() {
  const cartEl = document.getElementById("cartItems");
  if (!cartEl) return;

  const cart = getCart();
  if (cart.length === 0) {
    cartEl.innerHTML = `<p class="muted-text">Your cart is empty. Go to the shop to add items.</p>`;
    return;
  }

  const ul = document.createElement("ul");
  ul.className = "list";

  cart.forEach((item, index) => {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    if (!product) return;

    const li = document.createElement("li");
    li.className = "list-item";
    li.innerHTML = `
      <div class="list-item-main">
        <div class="list-item-title">${product.name}</div>
        <div class="list-item-sub">
          Qty: ${item.quantity} · Price: ₹${product.price} each · Total: ₹${product.price * item.quantity}
        </div>
      </div>
      <div style="display:flex;gap:6px;align-items:center;">
        <button class="btn-small btn-secondary" data-claim-one="${index}">Claim 1</button>
        <button class="btn-small btn-secondary" data-claim-all="${index}">Claim All</button>
      </div>
    `;
    ul.appendChild(li);
  });

  cartEl.innerHTML = "";
  cartEl.appendChild(ul);

  cartEl.addEventListener("click", handleCartClick, { once: true });
}

function handleCartClick(e) {
  const target = e.target;
  if (!(target instanceof HTMLElement)) return;

  const idxOne = target.getAttribute("data-claim-one");
  const idxAll = target.getAttribute("data-claim-all");

  if (idxOne !== null) {
    claimFromCart(Number(idxOne), 1);
  } else if (idxAll !== null) {
    claimFromCart(Number(idxAll), "all");
  }
}

function claimFromCart(index, howMuch) {
  const cart = getCart();
  if (!cart[index]) return;

  const item = cart[index];
  const product = PRODUCTS.find((p) => p.id === item.productId);
  if (!product) return;

  let qtyToClaim = 1;
  if (howMuch === "all") {
    qtyToClaim = item.quantity;
  }

  // Add to orders
  const orders = getOrders();
  orders.push({
    productId: item.productId,
    quantity: qtyToClaim,
    purchasedAt: new Date().toISOString(),
  });
  setOrders(orders);

  // Update cart
  item.quantity -= qtyToClaim;
  if (item.quantity <= 0) {
    cart.splice(index, 1);
  }
  setCart(cart);

  showToast(`Claimed ${qtyToClaim} x ${product.name}`);
  renderCartCount();
  renderCartItems();
  renderClaimedItems();
}

function renderClaimedItems() {
  const claimedEl = document.getElementById("claimedItems");
  if (!claimedEl) return;

  const orders = getOrders();
  if (orders.length === 0) {
    claimedEl.innerHTML = `<p class="muted-text">No items claimed yet.</p>`;
    return;
  }

  const ul = document.createElement("ul");
  ul.className = "list";

  orders.forEach((order) => {
    const product = PRODUCTS.find((p) => p.id === order.productId);
    if (!product) return;
    const date = new Date(order.purchasedAt);
    const li = document.createElement("li");
    li.className = "list-item";
    li.innerHTML = `
      <div class="list-item-main">
        <div class="list-item-title">${product.name}</div>
        <div class="list-item-sub">
          Qty: ${order.quantity} · Price: ₹${product.price} each · Total: ₹${product.price * order.quantity}<br/>
          Claimed at: ${date.toLocaleString()}
        </div>
      </div>
      <span class="badge badge-danger">Claimed</span>
    `;
    ul.appendChild(li);
  });

  claimedEl.innerHTML = "";
  claimedEl.appendChild(ul);
}

document.addEventListener("DOMContentLoaded", () => {
  requireLogin();
  renderCartCount();
  renderUserInfo();
  renderCartItems();
  renderClaimedItems();
});
