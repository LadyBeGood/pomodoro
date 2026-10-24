const found = document.querySelector<HTMLDivElement>("#app");

if (found === null) {
    throw new Error("Root element not found");
}

export const appElement: HTMLDivElement = found;