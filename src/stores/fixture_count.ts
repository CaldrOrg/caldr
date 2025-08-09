import fixtures from "@assets/fixtures";
import type { StateCreator } from "zustand";
import type { CaldrStore } from ".";
import type { Fixture } from "../model/Fixture";

export interface FixtureCountSlice {
	knownFixtures: Fixture[];
	knownOccupancies: string[];

	fixtureCode: "ipc" | "upc";
	setFixtureCode: (code: "ipc" | "upc") => void;

	fixturesCount: Map<string, number>;

	getFixtureCount: () => Fixture[];

	getTotalWsfu(): number;
	getTotalHwsfu(): number;
	getTotalDfu(): number;

	getTotalWsfuGpm(): number;
	getTotalHwsfuGpm(): number;
	getTotalDfuGpm(): number;

	getTotalHvacDemand(): number;
	getTotalIrrigationDemand(): number;
	getTotalOtherDemand(): number;
}

export const createFixtureCountSlice: StateCreator<CaldrStore, [], [], FixtureCountSlice> = (set, get) => ({
	knownFixtures: fixtures,
	knownOccupancies: Array.from(new Set(fixtures.map(f => f.occupancy))).sort(),

	fixtureCode: "ipc",
	setFixtureCode: (fixtureCode: "ipc" | "upc") => set({ fixtureCode }),

	fixturesCount: new Map(),

	getFixtureCount: () => [], // TODO

	getTotalWsfu: () => 0,
	getTotalHwsfu: () => 0,
	getTotalDfu: () => 0,

	getTotalWsfuGpm: () => get().wsfuToGpm(get().getTotalWsfu()),
	getTotalHwsfuGpm: () => get().hwsfuToGpm(get().getTotalHwsfu()),
	getTotalDfuGpm: () => get().dfuToGpm(get().getTotalDfu()),

	getTotalHvacDemand: () => 0,
	getTotalIrrigationDemand: () => 0,
	getTotalOtherDemand: () => 0,
});
