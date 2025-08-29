import ModuleLayout from "@layouts/ModuleLayout";
import { useCaldrStore } from "@stores/index";
import { IconTrash } from "@tabler/icons-react";
import { useRef } from "react";
import DemandSummary from "./DemandSummary";
import SearchBar from "./SearchBar";

export default function FixtureCount({ }: FixtureCountProps) {
	const { plumbingCode, fixturesCount, getFixture, addFixture, removeFixture } = useCaldrStore();

	const customFixtureLabelRef = useRef<HTMLInputElement>(null);

	const focusCustomFixtureLabel = () => customFixtureLabelRef.current?.focus();

	return (
		<>
			<ModuleLayout
				moduleName="Plumbing Fixture Count"
				moduleDescription="Fixture Count Input Module">

				<h2>Fixtures</h2>

				<div className="grid">
					<div className="s9">
						<SearchBar focusCustomFixtureLabel={focusCustomFixtureLabel} />

						<div className="large-space" />
						<div className="large-space" />

						<form onSubmit={e => { e.preventDefault(); return false; }}>
							<table className="stripes no-space min">
								<thead>
									<tr>
										<th>Qty</th>
										<th>Label</th>
										<th>Variant</th>
										<th>Occupancy</th>
										{plumbingCode === "ipc" && <th>IPC DFU</th>}
										{plumbingCode === "ipc" && <th>IPC SFU Total</th>}
										{plumbingCode === "ipc" && <th>IPC SFU Cold</th>}
										{plumbingCode === "ipc" && <th>IPC SFU Hot</th>}
										{plumbingCode === "upc" && <th>UPC DFU</th>}
										{plumbingCode === "upc" && <th>UPC SFU</th>}
										{/* <th>HVAC</th> */}
										{/* <th>Irrigation</th> */}
										{/* <th>Other</th> */}
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<div className="field border small">
												<input
													type="number"
													defaultValue={1}
													min={1}
													step={1}
													placeholder="Qty" />
											</div>
										</td>
										<td>
											<div className="field border small">
												<input
													type="text"
													placeholder="Label"
													autoComplete="off"
													ref={customFixtureLabelRef} />
											</div>
										</td>
										<td>
											<div className="field border small">
												<input
													type="text"
													placeholder="Variant"
													autoComplete="off" />
											</div>
										</td>
										<td>
											<div className="field border small">
												<input
													type="text"
													placeholder="Occupancy"
													autoComplete="off" />
											</div>
										</td>
										{plumbingCode === "ipc" && <td>
											<div className="field border small">
												<input
													type="number"
													min={0}
													placeholder="IPC DFU"
													autoComplete="off" />
											</div>
										</td>}
										{plumbingCode === "ipc" && <td>
											<div className="field border small">
												<input
													type="number"
													min={0}
													placeholder="IPC SFU Total"
													autoComplete="off" />
											</div>
										</td>}
										{plumbingCode === "ipc" && <td>
											<div className="field border small">
												<input
													type="number"
													min={0}
													placeholder="IPC SFU Cold"
													autoComplete="off" />
											</div>
										</td>}
										{plumbingCode === "ipc" && <td>
											<div className="field border small">
												<input
													type="number"
													min={0}
													placeholder="IPC SFU Hot"
													autoComplete="off" />
											</div>
										</td>}
										{plumbingCode === "upc" && <td>
											<div className="field border small">
												<input
													type="number"
													min={0}
													placeholder="UPC DFU"
													autoComplete="off" />
											</div>
										</td>}
										{plumbingCode === "upc" && <td>
											<div className="field border small">
												<input
													type="number"
													min={0}
													placeholder="UPC SFU"
													autoComplete="off" />
											</div>
										</td>}
										{/* <td>
											<div className="field border small">
												<input
													type="number"
													min={0}
													placeholder="HVAC"
													autoComplete="off" />
											</div>
										</td>
										<td>
											<div className="field border small">
												<input
													type="number"
													min={0}
													placeholder="Irrigation"
													autoComplete="off" />
											</div>
										</td>
										<td>
											<div className="field border small">
												<input
													type="number"
													min={0}
													placeholder="Other"
													autoComplete="off" />
											</div>
										</td> */}
										<td>
											<button
												type="submit"
												className="transparent square small">
												<i className="extra">add</i>
											</button>
										</td>
									</tr>
									{Object
										.entries(fixturesCount)
										.map(([uuid, count]) => {
											const fixture = getFixture(uuid)!;
											return (
												<tr key={uuid}>
													<td>
														<button
															type="button"
															className="transparent circle left-round small"
															disabled={count <= 1}
															onClick={() => addFixture(uuid, -1)}>-</button>
														<span>{count}</span>
														<button
															type="button"
															className="transparent circle right-round small"
															onClick={() => addFixture(uuid, 1)}>+</button>
													</td>
													<td>{fixture.fixture}</td>
													<td>
														<small>{fixture.variant}</small>
													</td>
													<td>{fixture.occupancy}</td>
													{plumbingCode === "ipc" && <td>{fixture.ipc_dfu ?? "N/A"}</td>}
													{plumbingCode === "ipc" && <td>{fixture.ipc_sfu_total ?? "N/A"}</td>}
													{plumbingCode === "ipc" && <td>{fixture.ipc_sfu_cold ?? "N/A"}</td>}
													{plumbingCode === "ipc" && <td>{fixture.ipc_sfu_hot ?? "N/A"}</td>}
													{plumbingCode === "upc" && <td>{fixture.upc_dfu ?? "N/A"}</td>}
													{plumbingCode === "upc" && <td>{fixture.upc_sfu ?? "N/A"}</td>}
													{/* <td>{fixture.hvac ?? "N/A"}</td> */}
													{/* <td>{fixture.irrigation ?? "N/A"}</td> */}
													{/* <td>{fixture.other ?? "N/A"}</td> */}
													<td>
														<button
															type="button"
															className="transparent square small"
															onClick={() => removeFixture(uuid)}>
															<IconTrash />
														</button>
													</td>
												</tr>
											);
										})}
								</tbody>
							</table>
						</form>
						{!Object.keys(fixturesCount).length && (
							<article className="medium middle-align center-align">
								<div>
									<i className="extra">shopping_basket</i>
									<h5>You haven't added any fixture yet</h5>
									<p>Search for a fixture using the search bar and add it to the list</p>
								</div>
							</article>
						)}
					</div>
					<div
						className="s3"
						style={{ position: "sticky", top: "5rem", height: "fit-content" }}>
						<DemandSummary />
					</div>
				</div>

			</ModuleLayout>
		</>
	);
}

interface FixtureCountProps {

}
