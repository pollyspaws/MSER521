function openDrawer() {
    const drawerEl = document.querySelector("#drawer");
    drawerEl.classList.add("open");
    drawerEl.setAttribute("false");
}

function closeDrawer() {
    const drawerEl = document.querySelector("#drawer");
    drawerEl.classList.remove("open");
    drawerEl.setAttribute("true");
}