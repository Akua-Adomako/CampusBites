const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("mobileSidebar");
const closeSidebar = document.getElementById("closeSidebar");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  sidebar.classList.toggle("show");
});

closeSidebar.addEventListener("click", () => {
  hamburger.classList.remove("open");
  sidebar.classList.remove("show");
});
