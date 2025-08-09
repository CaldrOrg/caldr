import { createMarkdownObjectTable } from "parse-markdown-table";

import ipc_dfu_str from "./ipc_dfu.md?raw";
import ipc_sfu_str from "./ipc_sfu.md?raw";
import upc_dfu_str from "./upc_dfu.md?raw";
import upc_sfu_str from "./upc_sfu.md?raw";

type Row = Record<"fixture" | "variant" | "occupancy", string>;


const canMerge = (a: Row, b: Row) => a.fixture === b.fixture
	&& (!a.occupancy || !b.occupancy || a.occupancy === b.occupancy);

const mergeFixtures = (a: Row, b: Row) => ({
	...a,
	...b,
	occupancy: a.occupancy || b.occupancy,
	variant: [a.variant, b.variant].filter(Boolean).join(" / "),
});

const mergeFixtureArrays = (a: Row[], b: Row[]) => {
	if(!a.length) return b;
	if(!b.length) return a;
	return a
		.map(af => b.map(bf => [af, bf] as const))
		.flat()
		.filter(([af, bf]) => canMerge(af, bf))
		.map(([af, bf]) => mergeFixtures(af, bf));
};

const mergeFixtureGroups = (o: Record<string, Row[]>) => Object
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
	.map(f => f.fixture)))
	.sort();

const ipc_dfu_grouped = Object.groupBy(ipc_dfu, row => row.fixture);
const ipc_sfu_grouped = Object.groupBy(ipc_sfu, row => row.fixture);
const upc_dfu_grouped = Object.groupBy(upc_dfu, row => row.fixture);
const upc_sfu_grouped = Object.groupBy(upc_sfu, row => row.fixture);

type Foo =
	& Row
	& {
		"ipc_dfu_min_trap_size_in": string;
		"ipc_dfu": string;
		"ipc_sfu_cold": string;
		"ipc_sfu_hot": string;
		"ipc_sfu_total": string;
		"ipc_sfu_type_supply_control": string;
		"upc_dfu_min_trap_size_in": string;
		"upc_dfu": string;
		"upc_sfu_min_branch_pipe_size_in": string;
		"upc_sfu": string;
	};

const foo = (fixture_names
	.map(fn => ({
		ipc_dfu_grouped: ipc_dfu_grouped[fn] ?? [],
		ipc_sfu_grouped: ipc_sfu_grouped[fn] ?? [],
		upc_dfu_grouped: upc_dfu_grouped[fn] ?? [],
		upc_sfu_grouped: upc_sfu_grouped[fn] ?? [],
	}))
	.map(mergeFixtureGroups)
	.flat() as Foo[])
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
	}));

export default foo;
