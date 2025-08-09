import ModuleLayout from "@layouts/ModuleLayout";
import { useCaldrStore } from "@stores/index";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

export default function FixtureCount({ }: FixtureCountProps) {
	const {
		knownFixtures,
		knownOccupancies,

		setFixtureCode, fixtureCode,

		getTotalWsfu,
		getTotalHwsfu,
		getTotalDfu,
		getTotalWsfuGpm,
		getTotalHwsfuGpm,
		getTotalDfuGpm,
		getTotalHvacDemand,
		getTotalIrrigationDemand,
		getTotalOtherDemand,

	} = useCaldrStore();

	const [searchTerm, setSearchTerm] = useState("");
	const [searchOccupancy, setSearchOccupancy] = useState("");

	const [foundFixtures, setFoundFixtures] = useState(knownFixtures);

	useEffect(() => {
		const fixtures = knownFixtures
			.filter(f =>
				f.fixture.toLowerCase().includes(searchTerm) ||
				f.variant?.toLowerCase().includes(searchTerm)
			)
			.filter(f => f.occupancy === searchOccupancy || searchOccupancy === "");

		setFoundFixtures(fixtures);
	}, [searchTerm, searchOccupancy]);

	return (
		<>
			<ModuleLayout
				moduleName="Plumbing Fixture Count"
				moduleDescription="Fixture Count Input Module"
				className={styles.fixtureCount}>

				<h1>Fixtures</h1>

				<label>
					IPC
					<input
						type="radio"
						name="fixture_code"
						value="ipc"
						onChange={e => setFixtureCode(e.currentTarget.value as "ipc" | "upc")}
						checked={fixtureCode === "ipc"} />
				</label>
				<label>
					UPC
					<input
						type="radio"
						name="fixture_code"
						value="upc"
						onChange={e => setFixtureCode(e.currentTarget.value as "ipc" | "upc")}
						checked={fixtureCode === "upc"} />
				</label>

				<details>
					<summary>Fixtures ({foundFixtures.length}/{knownFixtures.length})</summary>

					<input
						type="search"
						placeholder="Search fixtures..."
						defaultValue={searchTerm}
						onChange={e => setSearchTerm(e.currentTarget.value)} />

					<select
						defaultValue={searchOccupancy}
						onChange={e => setSearchOccupancy(e.currentTarget.value)}>
						{knownOccupancies.map(occupancy => (
							<option key={occupancy} value={occupancy}>
								{occupancy}
							</option>
						))}
					</select>

					<table>
						<thead>
							<tr>
								<th>Label</th>
								<th>Variant</th>
								<th>Occupancy</th>

								<th>IPC DFU</th>
								<th>IPC SFU Cold</th>
								<th>IPC SFU Hot</th>
								<th>IPC SFU Total</th>

								<th>UPC DFU</th>
								<th>UPC DFU Min Trap Size</th>
								<th>UPC SFU</th>

								{/* {fixtureCode === "ipc" && <th>IPC DFU</th>}
								{fixtureCode === "ipc" && <th>IPC SFU Cold</th>}
								{fixtureCode === "ipc" && <th>IPC SFU Hot</th>}
								{fixtureCode === "ipc" && <th>IPC SFU Total</th>}

								{fixtureCode === "upc" && <th>UPC DFU</th>}
								{fixtureCode === "upc" && <th>UPC SFU</th>} */}
							</tr>
						</thead>
						<tbody>
							{
								foundFixtures.map(f => (
									<tr key={String(f)}>
										<td>{f.fixture}</td>
										<td>{f.variant}</td>
										<td>{f.occupancy}</td>

										<td>{f.ipc_dfu ?? "N/A"}</td>
										<td>{f.ipc_sfu_cold ?? "N/A"}</td>
										<td>{f.ipc_sfu_hot ?? "N/A"}</td>
										<td>{f.ipc_sfu_total ?? "N/A"}</td>

										<td>{f.upc_dfu ?? "N/A"}</td>
										<td>{f.upc_dfu_min_trap_size_in ?? "N/A"}</td>
										<td>{f.upc_sfu ?? "N/A"}</td>

										{/* {fixtureCode === "ipc" && <td>{f.ipc_dfu ?? "N/A"}</td>}
										{fixtureCode === "ipc" && <td>{f.ipc_sfu_cold ?? "N/A"}</td>}
										{fixtureCode === "ipc" && <td>{f.ipc_sfu_hot ?? "N/A"}</td>}
										{fixtureCode === "ipc" && <td>{f.ipc_sfu_total ?? "N/A"}</td>}

										{fixtureCode === "upc" && <td>{f.upc_dfu ?? "N/A"}</td>}
										{fixtureCode === "upc" && <td>{f.upc_sfu ?? "N/A"}</td>} */}
									</tr>
								))
							}
						</tbody>
					</table>
				</details>

				<div className={styles.demandSummary}>
					<h2>Fixture Demand Summary</h2>

					<ul>
						<li><span>Total WSFU: </span>{getTotalWsfu()}</li>
						{fixtureCode === "ipc" && <li><span>Total HWSFU: </span>{getTotalHwsfu()}</li>}
						<li><span>Total DFU: </span>{getTotalDfu()}</li>
						<hr />
						<li><span>WSFU GPM: </span>{getTotalWsfuGpm()}</li>
						{fixtureCode === "ipc" && <li><span>HWSFU GPM: </span>{getTotalHwsfuGpm()}</li>}
						<li><span>DFU GPM: </span>{getTotalDfuGpm()}</li>
						<hr />
						<li><span>HVAC Demand: </span>{getTotalHvacDemand()}</li>
						<li><span>Irrigation Demand: </span>{getTotalIrrigationDemand()}</li>
						<li><span>Other Demand: </span>{getTotalOtherDemand()}</li>
					</ul>
				</div>
			</ModuleLayout>
		</>
	);
}

interface FixtureCountProps {

}
