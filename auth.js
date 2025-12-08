function getUser() {
  const raw = localStorage.getItem("hostelUser");
  return raw ? JSON.parse(raw) : null;
}

document.addEventListener("DOMContentLoaded", () => {
  const authBtn = document.getElementById("authButton");
  if (!authBtn) return;

  const user = getUser();

  if (user) {
    // User is logged in → show Logout button
    authBtn.textContent = "Logout";
    authBtn.removeAttribute("href");

    authBtn.addEventListener("click", () => {
      localStorage.removeItem("hostelUser");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("orders");
      window.location.href = "index.html"; // Go to landing page
    });

  } else {
    // User is not logged in → show Login button
    authBtn.textContent = "Login";
    authBtn.setAttribute("href", "login.html");
  }
});
