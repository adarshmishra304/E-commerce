// Optional: If user already logged in, you can auto-suggest going to shop/profile.
// (No heavy logic needed here.)

document.addEventListener("DOMContentLoaded", () => {
  const userRaw = localStorage.getItem("hostelUser");
  // You could show some message or redirect if you want
  // For now, we just leave the landing page simple.
   if (userRaw) {
    // If logged in → skip landing page
    window.location.href = "home.html";
  }
});
