import type { StateCreator } from "zustand";
import type { CaldrStore } from ".";

export interface DfuSfuToGpmSlice {
	dfuToGpm: (dfu: number) => number;
	wsfuToGpm: (sfu: number) => number;
	hwsfuToGpm: (sfu: number) => number;
}

export const createDfuSfuToGpmSlice: StateCreator<CaldrStore, [], [], DfuSfuToGpmSlice> = () => ({
	dfuToGpm: (dfu: number) => dfu * 0.5,
	wsfuToGpm: (sfu: number) => sfu * 0.6,
	hwsfuToGpm: (sfu: number) => sfu * 0.7,
});
