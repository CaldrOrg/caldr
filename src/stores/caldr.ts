import type { StateCreator } from "zustand";
import type { CaldrStore } from ".";

export interface CaldrSlice {
	theme: "light" | "dark";
	setTheme: (theme: "light" | "dark") => void;
	toggleTheme: () => void;

	printPage: () => void;
}

export const createCaldrSlice: StateCreator<CaldrStore, [], [], CaldrSlice> = (set, get) => ({
	theme: "light",
	setTheme: (theme) => {
		document.documentElement.setAttribute("data-theme", theme);
		document.documentElement.classList.toggle("dark", theme === "dark");
		document.documentElement.classList.toggle("light", theme === "light");
		set({ theme });
	},
	toggleTheme: () => get().theme === "light" ? get().setTheme("dark") : get().setTheme("light"),

	printPage: () => window.print(),
});
