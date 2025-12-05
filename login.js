document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const user = {
      name: formData.get("name").trim(),
      room: formData.get("room").trim(),
      block: formData.get("block").trim(),
      phone: formData.get("phone").trim(),
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("hostelUser", JSON.stringify(user));

    alert("Login successful! Redirecting to shop...");
    window.location.href = "shop.html";
  });
});
