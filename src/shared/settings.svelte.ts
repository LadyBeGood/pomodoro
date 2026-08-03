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

/**
 * Fallback to a default in case user has a invalid / outdated setting value
 */
function fallback(key: keyof typeof settings, validValues: string[], defaultValue: string) {
    if (!validValues.includes(settings[key])) {
        settings[key] = defaultValue;
        return true;
    }

    return false;
}

export function applyTheme() {
    if (fallback("theme", ["Dark", "Light"], "Dark")) return;

    let themeStyleElement = document.querySelector("#theme-style");

    if (themeStyleElement === null) {
        themeStyleElement = document.createElement("style");
        themeStyleElement.id = "theme-style"
    }

    if (settings.theme === "Dark") {
        themeStyleElement.innerHTML = dark
    } else if (settings.theme === "Light") {
        themeStyleElement.innerHTML = light
    }

    localStorage.setItem("theme", settings.theme);
    document.head.appendChild(themeStyleElement)
}

export function applyDefaultHomePage() {
    if (fallback("defaultHomePage", ["Pomodoro", "Timer"], "Pomodoro")) return;

    localStorage.setItem("defaultHomePage", settings.defaultHomePage);
}

// export function apply() {
//     if (fallback("defaultHomePage", ["Pomodoro", "Timer"], "Pomodoro")) return;
// }

// export function apply() {

// }

// export function apply() {

// }