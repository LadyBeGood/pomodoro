import dark from "../themes/dark.css?inline";
import light from "../themes/light.css?inline";

export const settings = $state({
    theme: localStorage.getItem("theme") ?? "Dark",
    defaultHomePage: localStorage.getItem("defaultHomePage") ?? "Pomodoro",
    sendNotifications: localStorage.getItem("sendNotifications") ?? "Yes",
    autoStartSession: localStorage.getItem("autoStartSession") ?? "No",
    autoStartBreak: localStorage.getItem("autoStartBreak") ?? "No",
    startOfWeek: localStorage.getItem("startOfWeek") ?? "Monday",
});


export function applyTheme() {
    let themeStyleElement = document.querySelector("#theme-style");

    if (themeStyleElement === null) {
        themeStyleElement = document.createElement("style");
        themeStyleElement.id = "theme-style"
    }

    if (settings.theme === "Dark") {
        themeStyleElement.innerHTML = dark
    } else if (settings.theme === "Light") {
        themeStyleElement.innerHTML = light
    } else { // fallback in case user has a invalid / outdated theme value
        settings.theme = "Dark"
        return
    }

    localStorage.setItem("theme", settings.theme);
    document.head.appendChild(themeStyleElement)
}

export function applyDefaultHomePage() {
    
}