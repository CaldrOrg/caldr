import { create } from "zustand";
import { createCaldrSlice, type CaldrSlice } from "./caldr";
import { createDfuSfuToGpmSlice, type DfuSfuToGpmSlice } from "./dfu_sfu_to_gpm";
import { createFixtureCountSlice, type FixtureCountSlice } from "./fixture_count";

export type CaldrStore =
	& CaldrSlice
	& FixtureCountSlice
	& DfuSfuToGpmSlice;

export const useCaldrStore = create<CaldrStore>()((...a) => ({
	...createCaldrSlice(...a),
	...createFixtureCountSlice(...a),
	...createDfuSfuToGpmSlice(...a)
}));
