import { deepEqual } from "fast-equals";
import { createMarkdownObjectTable } from "parse-markdown-table";

import ipc_dfu_str from "./ipc_dfu.md?raw";
import ipc_sfu_str from "./ipc_sfu.md?raw";
import upc_dfu_str from "./upc_dfu.md?raw";
import upc_sfu_str from "./upc_sfu.md?raw";

export type Row = Record<"fixture" | "variant" | "occupancy", string>;


export const canMerge = (a: Row, b: Row) => a.fixture === b.fixture
	&& (!a.occupancy || !b.occupancy || a.occupancy === b.occupancy);
// && fields in common, other than variant and occupancy, that have a value are the same

export const mergeFixtures = (a: Row, b: Row) => ({
	...a,
	...b,
	occupancy: a.occupancy || b.occupancy,
	variant: [...new Set([...a.variant.split(" / "), ...b.variant.split(" / ")].filter(Boolean)).values()].join(" / "),
});

export const includes = ({ variant: va, ...a }: Row, { variant: vb, ...b }: Row) =>
	Object.keys(b).every(key => key in b) &&
	Object
		.entries(b)
		// @ts-ignore
		.every(([key, value]) => a[key] === value) &&
	va.includes(vb);

export const mergeFixtureArrays = (a: Row[], b: Row[]) => {
	if(!a.length) return b;
	if(!b.length) return a;
	return a
		.map(af => b.map(bf => [af, bf] as const))
		.flat()
		.reduce((acc, [af, bf]) => {
			if(!acc.some(row => deepEqual(row, af))) acc.push(af);
			if(!acc.some(row => deepEqual(row, bf))) acc.push(bf);
			if(canMerge(af, bf)) {
				const merged = mergeFixtures(af, bf);
				if(!acc.some(row => deepEqual(row, merged))) acc.push(merged);
			}
			return acc;
		}, [] as Row[])
		.filter((f, i, a) => !a.filter((_, j) => i !== j).some(g => includes(g, f)));
};

export const mergeFixtureGroups = (o: Record<string, Row[]>) => Object
	.values(o)
	.reduce(mergeFixtureArrays);


const ipc_dfu = await Array.fromAsync(await createMarkdownObjectTable(ipc_dfu_str)) as Row[];
const ipc_sfu = await Array.fromAsync(await createMarkdownObjectTable(ipc_sfu_str)) as Row[];
const upc_dfu = await Array.fromAsync(await createMarkdownObjectTable(upc_dfu_str)) as Row[];
const upc_sfu = await Array.fromAsync(await createMarkdownObjectTable(upc_sfu_str)) as Row[];

const fixture_names = Array.from(new Set([
	ipc_dfu,
	ipc_sfu,
	upc_dfu,
	upc_sfu,
]
	.flat()
	.map(f => f.fixture)));

const ipc_dfu_grouped = Object.groupBy(ipc_dfu, row => row.fixture);
const ipc_sfu_grouped = Object.groupBy(ipc_sfu, row => row.fixture);
const upc_dfu_grouped = Object.groupBy(upc_dfu, row => row.fixture);
const upc_sfu_grouped = Object.groupBy(upc_sfu, row => row.fixture);

const extraFields = [
	"ipc_dfu_min_trap_size_in",
	"ipc_dfu",
	"ipc_sfu_cold",
	"ipc_sfu_hot",
	"ipc_sfu_total",
	"ipc_sfu_type_supply_control",
	"upc_dfu_min_trap_size_in",
	"upc_dfu",
	"upc_sfu_min_branch_pipe_size_in",
	"upc_sfu",
	"hvac",
	"irrigation",
	"other",
] as const;

type Foo =
	& Row
	& Record<typeof extraFields[number], string>;

const foo = (fixture_names
	.map(fn => ({
		ipc_dfu_grouped: ipc_dfu_grouped[fn] ?? [],
		ipc_sfu_grouped: ipc_sfu_grouped[fn] ?? [],
		upc_dfu_grouped: upc_dfu_grouped[fn] ?? [],
		upc_sfu_grouped: upc_sfu_grouped[fn] ?? [],
	}))
	.map(mergeFixtureGroups)
	.flat() as Foo[])
	// .filter(f => extraFields.every(g => g in f))
	.map(f => ({
		...f,
		ipc_dfu_min_trap_size_in: +f.ipc_dfu_min_trap_size_in || 0,
		ipc_dfu: +f.ipc_dfu || 0,
		ipc_sfu_cold: +f.ipc_sfu_cold || 0,
		ipc_sfu_hot: +f.ipc_sfu_hot || 0,
		ipc_sfu_total: +f.ipc_sfu_total || 0,
		upc_dfu_min_trap_size_in: +f.upc_dfu_min_trap_size_in || 0,
		upc_dfu: +f.upc_dfu || 0,
		upc_sfu_min_branch_pipe_size_in: +f.upc_sfu_min_branch_pipe_size_in || 0,
		upc_sfu: +f.upc_sfu || 0,
		hvac: +f.hvac || 0,
		irrigation: +f.irrigation || 0,
		other: +f.other || 0,
	}))
	.filter(f =>
		((f.ipc_dfu) && (f.ipc_sfu_cold || f.ipc_sfu_hot || f.ipc_sfu_total)) ||
		((f.upc_dfu) && (f.upc_sfu)))
	.sort((a, b) => a.fixture.localeCompare(b.fixture)
		|| a.variant.localeCompare(b.variant)
		|| a.occupancy.localeCompare(b.occupancy)
		|| a.ipc_dfu - b.ipc_dfu
		|| a.ipc_sfu_cold - b.ipc_sfu_cold
		|| a.ipc_sfu_hot - b.ipc_sfu_hot
		|| a.ipc_sfu_total - b.ipc_sfu_total
		|| a.upc_dfu - b.upc_dfu
		|| a.upc_sfu - b.upc_sfu);

export default foo;
