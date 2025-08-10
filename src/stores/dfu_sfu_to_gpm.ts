import type { StateCreator } from "zustand";
import type { CaldrStore } from ".";

export interface DfuSfuToGpmSlice {
	dfuToGpm: (dfu: number) => number;
	wsfuToGpm: (sfu: number) => number;
	hwsfuToGpm: (sfu: number) => number;

	round(value: number, precision?: number): number;
}

export const createDfuSfuToGpmSlice: StateCreator<CaldrStore, [], [], DfuSfuToGpmSlice> = (_set, get) => ({
	dfuToGpm: (dfu: number) => get().round(dfu * 0.5),
	wsfuToGpm: (sfu: number) => get().round(sfu * 0.6),
	hwsfuToGpm: (sfu: number) => get().round(sfu * 0.7),

	round: (value: number, precision: number = 2) => {
		const factor = Math.pow(10, precision);
		return Math.round(value * factor) / factor;
	},
});
