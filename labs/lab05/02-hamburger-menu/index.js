// Your code here.
function toggleMenu() {
    const buttonEl = document.querySelector("#menu-toggle");
    console.log(buttonEl);
    buttonEl.classList.toggle("active");
    const menuEl = document.querySelector("#nav-links");
    console.log(menuEl);
    menuEl.classList.toggle("active");
}