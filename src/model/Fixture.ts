export interface Fixture {
	fixture: string;
	variant: string;
	occupancy: string;

	ipc_dfu_min_trap_size_in: number;
	ipc_dfu: number;
	ipc_sfu_cold: number;
	ipc_sfu_hot: number;
	ipc_sfu_total: number;
	ipc_sfu_type_supply_control: string;

	upc_dfu_min_trap_size_in: number;
	upc_dfu: number;
	upc_sfu_min_branch_pipe_size_in: number;
	upc_sfu: number;

	hvac: number;
	irrigation: number;
	other: number;
}
