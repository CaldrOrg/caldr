import { create } from "zustand";
import { createCaldrSlice, type CaldrSlice } from "./caldr";
import { createDfuSfuToGpmSlice, type DfuSfuToGpmSlice } from "./dfu_sfu_to_gpm";
import { createFixtureCountSlice, type FixtureCountSlice } from "./fixture_count";
import { createProjectSettingsSlice, type ProjectSettingsSlice } from "./project_settings";

export type CaldrStore =
	& CaldrSlice
	& ProjectSettingsSlice
	& FixtureCountSlice
	& DfuSfuToGpmSlice;

export const useCaldrStore = create<CaldrStore>()((...a) => ({
	...createCaldrSlice(...a),
	...createProjectSettingsSlice(...a),
	...createFixtureCountSlice(...a),
	...createDfuSfuToGpmSlice(...a)
}));
