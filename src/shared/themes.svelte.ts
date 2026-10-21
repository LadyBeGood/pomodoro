
export const loadThemes: Record<string, () => Promise<typeof import("*?raw")>> = {
    Classic: () => import("../themes/classic.css?raw"),
    OLED: () => import("../themes/OLED.css?raw"),
    Sapphire: () => import("../themes/sapphire.css?raw"),
    Ocean: () => import("../themes/ocean.css?raw"),
    Forest: () => import("../themes/forest.css?raw"),
    Coffee: () => import("../themes/coffee.css?raw"),
    Berry: () => import("../themes/berry.css?raw"),
    Lavender: () => import("../themes/lavender.css?raw"),
};

export const themeNames = [
    "Classic",
    "OLED",
    "Sapphire",
    "Ocean",
    "Forest",
    "Coffee",
    "Lavender",
    "Berry",
];

export const defaultTheme = "Classic";

export const themeSelectorBackground = [
    "#2E2C2A",
    "#000000",
    "#26405F",
    "#1F4A4F",
    "#2F4A3A",
    "#4B352A",
    "#433E64",
    "#572B40",
];
