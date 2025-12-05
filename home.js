// Currently nothing special needed on home page.
// You can add dynamic text if you want.

document.addEventListener("DOMContentLoaded", () => {
  // Example: show a greeting if logged in
  const userRaw = localStorage.getItem("hostelUser");
  if (userRaw) {
    console.log("Logged in as:", JSON.parse(userRaw).name);
  }
});
