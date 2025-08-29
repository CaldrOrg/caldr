import { expect, test } from "vitest";
import { canMerge, mergeFixtureArrays, mergeFixtures, type Row } from "./fixtures";

test("canMerge - different fixture", () => {
	const a = { fixture: "Sink", variant: "Kitchen", occupancy: "Private" };
	const b = { fixture: "Toilet", variant: "Standard", occupancy: "Private" };
	expect(canMerge(a, b)).toBe(false);
});

test("canMerge - same fixture, different occupancy", () => {
	const a = { fixture: "Sink", variant: "Kitchen", occupancy: "Private" };
	const b = { fixture: "Sink", variant: "Bathroom", occupancy: "Public" };
	expect(canMerge(a, b)).toBe(false);
});

test("canMerge - same fixture, same occupancy", () => {
	const a = { fixture: "Sink", variant: "Kitchen", occupancy: "Private" };
	const b = { fixture: "Sink", variant: "Bathroom", occupancy: "Private" };
	expect(canMerge(a, b)).toBe(true);
});

test("canMerge - same fixture, one occupancy missing", () => {
	const a = { fixture: "Sink", variant: "Kitchen", occupancy: "" };
	const b = { fixture: "Sink", variant: "Bathroom", occupancy: "Private" };
	expect(canMerge(a, b)).toBe(true);
});

test("canMerge - same fixture, both occupancies missing", () => {
	const a = { fixture: "Sink", variant: "Kitchen", occupancy: "" };
	const b = { fixture: "Sink", variant: "Bathroom", occupancy: "" };
	expect(canMerge(a, b)).toBe(true);
});

test("canMerge - same fixture, different variants", () => {
	const a = { fixture: "Sink", variant: "Kitchen", occupancy: "Private" };
	const b = { fixture: "Sink", variant: "Bathroom", occupancy: "Private" };
	expect(canMerge(a, b)).toBe(true);
});

///////////////////

test("mergeFixtures - fixture name", () => {
	const a = { fixture: "Sink", variant: "", occupancy: "" };
	const b = { fixture: "Sink", variant: "", occupancy: "" };
	const merged = mergeFixtures(a, b);
	expect(merged).toMatchObject({ fixture: "Sink" });
});

test("mergeFixtures - both occupancies missing", () => {
	const a = { fixture: "Sink", variant: "", occupancy: "" };
	const b = { fixture: "Sink", variant: "", occupancy: "" };
	const merged = mergeFixtures(a, b);
	expect(merged).toMatchObject({ occupancy: "" });
});

test("mergeFixtures - one occupancy missing, first", () => {
	const a = { fixture: "Sink", variant: "", occupancy: "Private" };
	const b = { fixture: "Sink", variant: "", occupancy: "" };
	const merged = mergeFixtures(a, b);
	expect(merged).toMatchObject({ occupancy: "Private" });
});

test("mergeFixtures - one occupancy missing, second", () => {
	const a = { fixture: "Sink", variant: "", occupancy: "" };
	const b = { fixture: "Sink", variant: "", occupancy: "Private" };
	const merged = mergeFixtures(a, b);
	expect(merged).toMatchObject({ occupancy: "Private" });
});

test("mergeFixtures - both occupancies provided", () => {
	const a = { fixture: "Sink", variant: "", occupancy: "Private" };
	const b = { fixture: "Sink", variant: "", occupancy: "Private" };
	const merged = mergeFixtures(a, b);
	expect(merged).toMatchObject({ occupancy: "Private" });
});

test("mergeFixtures - both variants missing", () => {
	const a = { fixture: "Sink", variant: "", occupancy: "" };
	const b = { fixture: "Sink", variant: "", occupancy: "" };
	const merged = mergeFixtures(a, b);
	expect(merged).toMatchObject({ variant: "" });
});

test("mergeFixtures - one variant provided, first", () => {
	const a = { fixture: "Sink", variant: "Kitchen", occupancy: "" };
	const b = { fixture: "Sink", variant: "", occupancy: "" };
	const merged = mergeFixtures(a, b);
	expect(merged).toMatchObject({ variant: "Kitchen" });
});

test("mergeFixtures - one variant provided, second", () => {
	const a = { fixture: "Sink", variant: "", occupancy: "" };
	const b = { fixture: "Sink", variant: "Kitchen", occupancy: "" };
	const merged = mergeFixtures(a, b);
	expect(merged).toMatchObject({ variant: "Kitchen" });
});

test("mergeFixtures - both variants provided, same", () => {
	const a = { fixture: "Sink", variant: "Kitchen", occupancy: "" };
	const b = { fixture: "Sink", variant: "Kitchen", occupancy: "" };
	const merged = mergeFixtures(a, b);
	expect(merged).toMatchObject({ variant: "Kitchen" });
});

test("mergeFixtures - both variants provided, different", () => {
	const a = { fixture: "Sink", variant: "Kitchen", occupancy: "" };
	const b = { fixture: "Sink", variant: "Bathroom", occupancy: "" };
	const merged = mergeFixtures(a, b);
	expect(merged).toMatchObject({ variant: "Kitchen / Bathroom" });
});

test("mergeFixtures - merge other properties", () => {
	const a = { fixture: "Sink", variant: "", occupancy: "", ipc_dfu: "10" };
	const b = { fixture: "Sink", variant: "", occupancy: "", ipc_sfu: "25" };
	const merged = mergeFixtures(a, b);
	expect(merged).toMatchObject({ ipc_dfu: "10", ipc_sfu: "25" });
});

//////////////////////

test("mergeFixtureArrays - both empty", () => {
	const a: Row[] = [];
	const b: Row[] = [];
	const merged = mergeFixtureArrays(a, b);
	expect(merged).toEqual([]);
});

test("mergeFixtureArrays - first empty", () => {
	const a: Row[] = [];
	const b: Row[] = [
		{ fixture: "Sink", variant: "Kitchen", occupancy: "Private" },
	];
	const merged = mergeFixtureArrays(a, b);
	expect(merged).toEqual(b);
});

test("mergeFixtureArrays - second empty", () => {
	const a: Row[] = [
		{ fixture: "Sink", variant: "Kitchen", occupancy: "Private" },
	];
	const b: Row[] = [];
	const merged = mergeFixtureArrays(a, b);
	expect(merged).toEqual(a);
});

test("mergeFixtureArrays - cannot merge", () => {
	const a: Row[] = [
		{ fixture: "Sink", variant: "", occupancy: "Public" },
	];
	const b: Row[] = [
		{ fixture: "Sink", variant: "", occupancy: "Private" },
	];
	const merged = mergeFixtureArrays(a, b);
	expect(merged).toEqual([...a, ...b]);
});

test("mergeFixtureArrays - can merge", () => {
	const a = [
		{ fixture: "Sink", variant: "Kitchen", occupancy: "", ipc_dfu: "10" },
	];
	const b = [
		{ fixture: "Sink", variant: "Kitchen", occupancy: "", ipc_sfu: "25" },
	];
	const merged = mergeFixtureArrays(a, b);
	expect(merged).toEqual([
		{ fixture: "Sink", variant: "Kitchen", occupancy: "", ipc_dfu: "10", ipc_sfu: "25" },
	]);
});

test("mergeFixtureArrays - mixed 1", () => {
	const a = [
		{ fixture: "Sink", variant: "Kitchen", occupancy: "Private", ipc_dfu: "10" },
	];
	const b = [
		{ fixture: "Sink", variant: "Kitchen", occupancy: "Private", ipc_sfu: "25" },
		{ fixture: "Sink", variant: "Kitchen", occupancy: "Public", ipc_sfu: "25" },
	];
	const merged = mergeFixtureArrays(a, b);
	expect(merged).toEqual([
		{ fixture: "Sink", variant: "Kitchen", occupancy: "Private", ipc_dfu: "10", ipc_sfu: "25" },
	]);
});

test("mergeFixtureArrays - mixed 2", () => {
	const a = [
		{ fixture: "Sink", variant: "Kitchen", occupancy: "Private", ipc_dfu: "10" },
	];
	const b = [
		{ fixture: "Sink", variant: "Kitchen", occupancy: "Private", ipc_sfu: "25" },
		{ fixture: "Sink", variant: "Bathroom", occupancy: "Private", ipc_sfu: "15" },
		{ fixture: "Sink", variant: "", occupancy: "Private", ipc_sfu: "5" },
	];
	const merged = mergeFixtureArrays(a, b);
	expect(merged).toEqual([
		{ fixture: "Sink", variant: "Kitchen", occupancy: "Private", ipc_dfu: "10", ipc_sfu: "25" },
		{ fixture: "Sink", variant: "Kitchen / Bathroom", occupancy: "Private", ipc_dfu: "10", ipc_sfu: "15" },
		{ fixture: "Sink", variant: "Kitchen", occupancy: "Private", ipc_dfu: "10", ipc_sfu: "5" },
	]);
});

test("mergeFixtureArrays - mixed 2", () => {
	const a = [
		{ fixture: "Sink", variant: "Kitchen", occupancy: "Private", ipc_dfu: "10" },
		{ fixture: "Sink", variant: "Bathroom", occupancy: "Private", ipc_dfu: "20" },
		{ fixture: "Sink", variant: "", occupancy: "Private", ipc_dfu: "30" },
	];
	const b = [
		{ fixture: "Sink", variant: "Kitchen", occupancy: "Private", ipc_sfu: "25" },
		{ fixture: "Sink", variant: "Bathroom", occupancy: "Private", ipc_sfu: "15" },
		{ fixture: "Sink", variant: "", occupancy: "Private", ipc_sfu: "5" },
	];
	const merged = mergeFixtureArrays(a, b);
	expect(merged).toEqual([
		{ fixture: "Sink", variant: "Kitchen", occupancy: "Private", ipc_dfu: "10", ipc_sfu: "25" },
		{ fixture: "Sink", variant: "Kitchen / Bathroom", occupancy: "Private", ipc_dfu: "10", ipc_sfu: "15" },
		{ fixture: "Sink", variant: "Kitchen", occupancy: "Private", ipc_dfu: "10", ipc_sfu: "5" },
		{ fixture: "Sink", variant: "Bathroom / Kitchen", occupancy: "Private", ipc_dfu: "20", ipc_sfu: "25" },
		{ fixture: "Sink", variant: "Bathroom", occupancy: "Private", ipc_dfu: "20", ipc_sfu: "15" },
		{ fixture: "Sink", variant: "Bathroom", occupancy: "Private", ipc_dfu: "20", ipc_sfu: "5" },
		{ fixture: "Sink", variant: "", occupancy: "Private", ipc_dfu: "30", ipc_sfu: "25" },
		{ fixture: "Sink", variant: "", occupancy: "Private", ipc_dfu: "30", ipc_sfu: "15" },
		{ fixture: "Sink", variant: "", occupancy: "Private", ipc_dfu: "30", ipc_sfu: "5" },
	]);
});
