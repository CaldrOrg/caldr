import type { StateCreator } from "zustand";
import type { CaldrStore } from ".";

export interface ProjectSettingsSlice {
	projectName: string;
	setProjectName: (projectName: string) => void;

	projectNumber: string;
	setProjectNumber: (projectNumber: string) => void;

	projectDate: string;
	setProjectDate: (projectDate: string) => void;

	projectDesignerEngineer: string;
	setProjectDesignerEngineer: (projectDesignerEngineer: string) => void;
}

export const createProjectSettingsSlice: StateCreator<CaldrStore, [], [], ProjectSettingsSlice> = (set) => ({
	projectName: "",
	setProjectName: (projectName: string) => set({ projectName }),

	projectNumber: "",
	setProjectNumber: (projectNumber: string) => set({ projectNumber }),

	projectDate: "",
	setProjectDate: (projectDate: string) => set({ projectDate }),

	projectDesignerEngineer: "",
	setProjectDesignerEngineer: (projectDesignerEngineer: string) => set({ projectDesignerEngineer }),
});
