// Currently nothing special needed on home page.
// You can add dynamic text if you want.

// document.addEventListener("DOMContentLoaded", () => {
//   // Example: show a greeting if logged in
//   const userRaw = localStorage.getItem("hostelUser");
//   if (userRaw) {
//     console.log("Logged in as:", JSON.parse(userRaw).name);
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  const userRaw = localStorage.getItem("hostelUser");
  const loginCard = document.getElementById("loginStepCard");

  if (userRaw && loginCard) {
    loginCard.style.display = "none"; // HIDE the login step card
  }
});

