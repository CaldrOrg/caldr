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
		document.body.classList.remove(get().theme);
		document.body.classList.add(theme);
		set({ theme });
	},
	toggleTheme: () => get().theme === "light" ? get().setTheme("dark") : get().setTheme("light"),

	printPage: () => window.print(),
});
