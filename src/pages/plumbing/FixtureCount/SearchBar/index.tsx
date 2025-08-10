import { useCaldrStore } from "@stores/index";
import { useEffect, useState } from "react";

import styles from "./styles.module.scss";

export default function SearchBar({ }: SearchBarProps) {
	const { knownFixtures, knownOccupancies } = useCaldrStore();

	const [searchTerm, setSearchTerm] = useState("");
	const [searchOccupancy, setSearchOccupancy] = useState("");

	const [foundFixtures, setFoundFixtures] = useState(knownFixtures);

	useEffect(() => {
		const fixtures = knownFixtures
			.filter(f => searchTerm.toLowerCase().split(" ").every(t => (f.fixture.toLowerCase() + " " + f.variant?.toLowerCase()).includes(t)))
			.filter(f => f.occupancy === searchOccupancy || searchOccupancy === "");

		setFoundFixtures(fixtures);
	}, [searchTerm, searchOccupancy, knownFixtures]);

	const addFixture = (uuid: string, amount: number) => {
		useCaldrStore.getState().addFixture(uuid, amount);
		// setSearchTerm("");
		// setSearchOccupancy("");
	};


	return (
		<div className={styles.searchBar}>
			<input
				type="search"
				placeholder="Search fixtures..."
				value={searchTerm}
				onChange={e => setSearchTerm(e.currentTarget.value)} />

			<select
				value={searchOccupancy}
				onChange={e => setSearchOccupancy(e.currentTarget.value)}
				style={{ visibility: searchTerm ? "visible" : "hidden" }}>
				<option></option>
				{knownOccupancies.map(occupancy => (
					<option key={occupancy} value={occupancy}>
						{occupancy}
					</option>
				))}
			</select>

			<div className={styles.float}>
				{searchTerm && <ul>
					{foundFixtures.map(fixture => (
						<li key={fixture.uuid}>
							<span>{fixture.fixture}</span>
							<span>{fixture.occupancy}</span>
							<span>{fixture.variant}</span>
							<div>
								<button>-</button>
								<input
									type="number"
									defaultValue={1}
									min={1}
								/>
								<button>+</button>
								<button onClick={() => addFixture(fixture.uuid, 1)}>
									Add
								</button>
							</div>
						</li>
					))}
				</ul>}
			</div>

			{/* <details>
									<summary>Fixtures ({foundFixtures.length}/{knownFixtures.length})</summary>
									<table>
										<thead>
											<tr>
												<th>Label</th>
												<th>Variant</th>
												<th>Occupancy</th>

												{fixtureCode === "ipc" && <th>IPC DFU</th>}
												{fixtureCode === "ipc" && <th>IPC SFU Cold</th>}
												{fixtureCode === "ipc" && <th>IPC SFU Hot</th>}
												{fixtureCode === "ipc" && <th>IPC SFU Total</th>}

												{fixtureCode === "upc" && <th>UPC DFU</th>}
												{fixtureCode === "upc" && <th>UPC SFU</th>}

												<th>HVAC</th>
												<th>Irrigation</th>
												<th>Other</th>
											</tr>
										</thead>
										<tbody>
											{
												foundFixtures.map(f => (
													<tr key={f.uuid}
														className={clsx({
															[styles.disabled]:
																f.ipc_dfu +
																f.upc_dfu === 0 ||
																f.ipc_sfu_cold +
																f.ipc_sfu_hot +
																f.ipc_sfu_total +
																f.upc_sfu === 0
														})}>
														<td>{f.fixture}</td>
														<td>{f.variant}</td>
														<td>{f.occupancy}</td>

														{fixtureCode === "ipc" && <td>{f.ipc_dfu ?? "N/A"}</td>}
														{fixtureCode === "ipc" && <td>{f.ipc_sfu_cold ?? "N/A"}</td>}
														{fixtureCode === "ipc" && <td>{f.ipc_sfu_hot ?? "N/A"}</td>}
														{fixtureCode === "ipc" && <td>{f.ipc_sfu_total ?? "N/A"}</td>}

														{fixtureCode === "upc" && <td>{f.upc_dfu ?? "N/A"}</td>}
														{fixtureCode === "upc" && <td>{f.upc_sfu ?? "N/A"}</td>}

														<td>{f.hvac ?? "N/A"}</td>
														<td>{f.irrigation ?? "N/A"}</td>
														<td>{f.other ?? "N/A"}</td>
													</tr>
												))
											}
										</tbody>
									</table>
								</details> */}
		</div>
	);
}

interface SearchBarProps {

}
