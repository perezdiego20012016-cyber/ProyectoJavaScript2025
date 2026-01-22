document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("darkModeBtn");

    if (!btn) return;

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        btn.textContent = "☀️ Modo claro";
    }

    btn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const isDark = document.body.classList.contains("dark-mode");
        btn.textContent = isDark ? "☀️ Modo claro" : "🌙 Modo oscuro";

        localStorage.setItem("theme", isDark ? "dark" : "light");
    });

    AOS.init({
        duration: 1000,
        once: true
    });
});
