import ModuleLayout from "@layouts/ModuleLayout";
import { useCaldrStore } from "@stores/index";
import { IconTrash } from "@tabler/icons-react";
import DemandSummary from "./DemandSummary";
import SearchBar from "./SearchBar";
import styles from "./styles.module.scss";

export default function FixtureCount({ }: FixtureCountProps) {
	const { plumbingCode, fixturesCount, getFixture, } = useCaldrStore();

	return (
		<>
			<ModuleLayout
				moduleName="Plumbing Fixture Count"
				moduleDescription="Fixture Count Input Module"
				className={styles.fixtureCount}>

				<h1>Fixtures</h1>

				<SearchBar />

				<div>
					<table>
						<thead>
							<tr>
								<th>Qty</th>
								<th>Label</th>
								<th>Variant</th>
								<th>Occupancy</th>
								{plumbingCode === "ipc" && <th>IPC DFU</th>}
								{plumbingCode === "ipc" && <th>IPC SFU Cold</th>}
								{plumbingCode === "ipc" && <th>IPC SFU Hot</th>}
								{plumbingCode === "ipc" && <th>IPC SFU Total</th>}
								{plumbingCode === "upc" && <th>UPC DFU</th>}
								{plumbingCode === "upc" && <th>UPC SFU</th>}
								<th>HVAC</th>
								<th>Irrigation</th>
								<th>Other</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{Object
								.entries(fixturesCount)
								.map(([uuid, count]) => {
									const fixture = getFixture(uuid)!;
									return (
										<tr key={uuid}>
											<td>
												<button disabled={count === 1}>-</button>
												<input defaultValue={count} />
												<button>+</button>
											</td>
											<td>{fixture.fixture}</td>
											<td>{fixture.variant}</td>
											<td>{fixture.occupancy}</td>
											{plumbingCode === "ipc" && <td>{fixture.ipc_dfu ?? "N/A"}</td>}
											{plumbingCode === "ipc" && <td>{fixture.ipc_sfu_cold ?? "N/A"}</td>}
											{plumbingCode === "ipc" && <td>{fixture.ipc_sfu_hot ?? "N/A"}</td>}
											{plumbingCode === "ipc" && <td>{fixture.ipc_sfu_total ?? "N/A"}</td>}
											{plumbingCode === "upc" && <td>{fixture.upc_dfu ?? "N/A"}</td>}
											{plumbingCode === "upc" && <td>{fixture.upc_sfu ?? "N/A"}</td>}
											<td>{fixture.hvac ?? "N/A"}</td>
											<td>{fixture.irrigation ?? "N/A"}</td>
											<td>{fixture.other ?? "N/A"}</td>
											<td>
												<button>
													<IconTrash />
												</button>
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>

					<DemandSummary />
				</div>

			</ModuleLayout>
		</>
	);
}

interface FixtureCountProps {

}
