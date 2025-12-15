function getUser() {
  const raw = localStorage.getItem("hostelUser");
  return raw ? JSON.parse(raw) : null;
}

document.addEventListener("DOMContentLoaded", () => {
  const authBtn = document.getElementById("authButton");
   const landing = document.getElementById("landingLink");
   const Home = document.getElementById("homeLink");
  if (!authBtn) return;

  const user = getUser();

  if (user) {
    // User is logged in → show Logout button
    authBtn.textContent = "Logout";
    authBtn.removeAttribute("href");

    // ❌ Hide Landing link
    if (landing) {
      landing.style.display = "none";
      Home.style.display = "inline-block";
    }


    authBtn.addEventListener("click", () => {
      localStorage.removeItem("hostelUser");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("orders");
      window.location.href = "index.html"; // Go to landing page
    }
  );

  } else {
    // User is not logged in → show Login button
    authBtn.textContent = "Login";
    authBtn.setAttribute("href", "login.html");
     
    
    // ✅ Show Landing link again
     if (landing) {
      landing.style.display = "inline-block";
      Home.style.display = "none";
    }
  }
});
