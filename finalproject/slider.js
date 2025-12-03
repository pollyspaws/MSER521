const slider = document.getElementById("slider");
const wrapper = document.getElementById("afterWrapper");
const handle = document.getElementById("handle");

let dragging = false;

handle.addEventListener("mousedown", () => (dragging = true));
window.addEventListener("mouseup", () => (dragging = false));
window.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    const rect = slider.getBoundingClientRect();
    let x = e.clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    wrapper.style.width = x + "px";
    handle.style.left = x - handle.offsetWidth / 2 + "px";
});