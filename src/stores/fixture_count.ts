import fixtures from "@assets/fixtures";
import type { Fixture } from "@model/Fixture";
import type { StateCreator } from "zustand";
import type { CaldrStore } from ".";

export interface FixtureCountSlice {
	knownFixtures: (Fixture & { uuid: string; })[];
	knownOccupancies: string[];

	plumbingCode: "ipc" | "upc";
	setPlumbingCode: (plumbingCode: "ipc" | "upc") => void;

	fixturesCount: Record<string, number>;
	getFixture: (uuid: string) => Fixture | undefined;
	addFixture: (uuid: string, count: number) => void;
	removeFixture: (uuid: string) => void;

	getFixtureCount: () => Fixture[];

	getTotalWsfu: () => number;
	getTotalHwsfu: () => number;
	getTotalDfu: () => number;

	getTotalWsfuGpm: () => number;
	getTotalHwsfuGpm: () => number;
	getTotalDfuGpm: () => number;

	getTotalHvacDemand: () => number;
	getTotalIrrigationDemand: () => number;
	getTotalOtherDemand: () => number;
}

export const createFixtureCountSlice: StateCreator<CaldrStore, [], [], FixtureCountSlice> = (set, get) => ({
	knownFixtures: fixtures.map(f => ({
		...f,
		uuid: crypto.randomUUID(),
	})),
	knownOccupancies: Array.from(new Set(fixtures.map(f => f.occupancy))).sort(),

	plumbingCode: "ipc",
	setPlumbingCode: (plumbingCode: "ipc" | "upc") => set({ plumbingCode }),

	fixturesCount: {},
	getFixture: (uuid: string) => get().knownFixtures.find(f => f.uuid === uuid),
	addFixture: (uuid: string, count: number) => (get().fixturesCount[uuid] ?? 0) + count > 0
		? set({ fixturesCount: { ...get().fixturesCount, [uuid]: (get().fixturesCount[uuid] ?? 0) + count } })
		: get().removeFixture(uuid),
	removeFixture: (uuid: string) => {
		const fixturesCount = { ...get().fixturesCount };
		delete fixturesCount[uuid];
		set({ fixturesCount });
	},

	getFixtureCount: () => Object
		.entries(get().fixturesCount)
		.map(([uuid, count]) => {
			const fixture = get().getFixture(uuid);
			return fixture && new Array(count).fill(fixture);
		})
		.filter(Boolean)
		.flat(),

	getTotalWsfu: () => get().round(get()
		.getFixtureCount()
		.reduce((p, c) => p + (get().plumbingCode === "ipc" ? c.ipc_sfu_total : c.upc_sfu), 0)),
	getTotalHwsfu: () => get().round(get()
		.getFixtureCount()
		.reduce((p, c) => p + (c.ipc_sfu_hot ?? 0), 0)),
	getTotalDfu: () => get().round(get()
		.getFixtureCount()
		.reduce((p, c) => p + (get().plumbingCode === "ipc" ? c.ipc_dfu : c.upc_dfu), 0)),

	getTotalWsfuGpm: () => get().wsfuToGpm(get().getTotalWsfu()),
	getTotalHwsfuGpm: () => get().hwsfuToGpm(get().getTotalHwsfu()),
	getTotalDfuGpm: () => get().dfuToGpm(get().getTotalDfu()),

	getTotalHvacDemand: () => 0,
	getTotalIrrigationDemand: () => 0,
	getTotalOtherDemand: () => 0,
});
