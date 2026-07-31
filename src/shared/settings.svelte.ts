import dark from "../themes/dark.css?inline";
import light from "../themes/light.css?inline";

export const settings = $state({
    theme: "dark"
});


export function applyTheme() {
    let themeStyleElement = document.querySelector("#theme-style");

    if (themeStyleElement === null) {
        themeStyleElement = document.createElement("style");
        themeStyleElement.id = "theme-style"
    }

    if (settings.theme === "dark") {
        themeStyleElement.innerHTML = dark
    } else {
        themeStyleElement.innerHTML = light
    }

    document.head.appendChild(themeStyleElement)
}

