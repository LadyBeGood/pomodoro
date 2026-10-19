import Chart from "chart.js/auto";

// Resolves a CSS variable (hex, oklch, rgb, whatever) to rgba() so alpha can be added safely
export function cssColor(element: HTMLElement, cssVar: string, alpha = 1) {
    const probe = document.createElement("span");
    probe.style.color = `var(${cssVar})`;
    element.appendChild(probe);
    const computed = getComputedStyle(probe).color;
    probe.remove();

    const context = document.createElement("canvas").getContext("2d", { willReadFrequently: true })!;
    context.fillStyle = computed;
    context.fillRect(0, 0, 1, 1);
    const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function applyChartDefaults(element: HTMLElement) {
    Chart.defaults.font.family = getComputedStyle(document.body).fontFamily;
    Chart.defaults.font.size = 12;
    Chart.defaults.color = cssColor(element, "--luxury-white", 0.6);


}

