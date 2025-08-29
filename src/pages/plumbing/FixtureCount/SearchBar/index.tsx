import { useCaldrStore } from "@stores/index";
import clsx from "clsx";
import randomColor from "randomcolor";
import { useEffect, useRef, useState } from "react";
import { listenForOutsideClicks } from "./listenForOutsideClicks";

export default function SearchBar({ focusCustomFixtureLabel }: SearchBarProps) {
	const { knownFixtures, knownOccupancies, theme, plumbingCode } = useCaldrStore();

	const inputRef = useRef<HTMLInputElement>(null);

	const ref = useRef(null);
	const [listening, setListening] = useState(false);
	const [open, setOpen] = useState(false);

	const [searchTerm, setSearchTerm] = useState("");
	const [searchOccupancy, setSearchOccupancy] = useState("");

	const [foundFixtures, setFoundFixtures] = useState(knownFixtures);

	useEffect(() => {
		const fixtures = knownFixtures
			.filter(f => searchTerm.toLowerCase().split(" ").every(t => (f.fixture.toLowerCase() + " " + f.variant?.toLowerCase()).includes(t)))
			.filter(f => f.occupancy === searchOccupancy || searchOccupancy === "");

		setFoundFixtures(fixtures);
	}, [searchTerm, searchOccupancy, knownFixtures]);

	useEffect(listenForOutsideClicks(listening, setListening, ref, () => setOpen(false)), [listening, setListening, ref]);

	const addFixture = (uuid: string, amount: number) => {
		useCaldrStore.getState().addFixture(uuid, amount);
		setSearchTerm("");
		setSearchOccupancy("");
		setOpen(false);
	};


	return (
		<article className="grid" style={{ width: "100%", position: "absolute", zIndex: 2 }} ref={ref}>

			<div className="s8 field prefix postfix border round">
				<i>search</i>
				<input
					ref={inputRef}
					type="search"
					placeholder="Search for fixtures"
					value={searchTerm}
					onChange={e => setSearchTerm(e.currentTarget.value)}
					onFocus={() => setOpen(true)}
				/>
				{searchTerm && <i onClick={() => { setSearchTerm(""); inputRef.current?.focus(); setOpen(true); }} style={{ zIndex: 3 }}>close</i>}
			</div>


			<div
				className="s4 field label suffix border"
				style={{ display: open ? "block" : "none" }}>
				<select value={searchOccupancy}
					onChange={e => setSearchOccupancy(e.currentTarget.value)}>
					<option></option>
					{knownOccupancies
						.filter(Boolean)
						.map(occupancy => (
							<option key={occupancy} value={occupancy}>
								{occupancy}
							</option>
						))}
				</select>
				<label>Occupancy</label>
				<i>arrow_drop_down</i>
			</div>

			{open &&
				<div className="s12">
					{!!foundFixtures.length && <ul
						className="list border"
						style={{ maxHeight: "50vh", overflowY: "auto" }}>
						{foundFixtures.map((fixture, i) => (
							<li key={fixture.uuid} className={clsx({ "surface-container": i % 2 === 0 })}>
								{/* <i>home</i> */}
								<div className="max" style={{ lineHeight: 1.25 }}>
									<h6
										className="small"
										style={{ color: randomColor({ luminosity: theme === "light" ? "dark" : "light", seed: fixture.fixture }) }}>
										{fixture.fixture}
									</h6>
									<small style={{ display: "block" }}>{
										[fixture.occupancy, fixture.variant]
											.filter(Boolean)
											.join(" - ")
									}</small>
									<small style={{ display: "block" }}>{plumbingCode === "ipc"
										? `DFU: ${fixture.ipc_dfu} - SFU: ${fixture.ipc_sfu_total} - SFU Cold: ${fixture.ipc_sfu_cold} - SFU Hot: ${fixture.ipc_sfu_hot}`
										: `DFU: ${fixture.upc_dfu} - SFU: ${fixture.upc_sfu}`
									}</small>
								</div>
								<label style={{ flex: 0 }}>
									<div className="grid middle-align">
										<button className="s2 small border">-</button>
										<div className="s4 field small border">
											<input
												type="number"
												defaultValue={1}
												min={1}
												step={1} />
										</div>
										<button className="s2 small border">+</button>
										<button
											className="s4 small-round small"
											onClick={() => addFixture(fixture.uuid, 1)}>
											<span>Add</span>
										</button>
									</div>
								</label>
							</li>
						))}
					</ul>}
					{!foundFixtures.length && <article className="center-align surface-dim">
						<div>
							<i className="extra">manage_search</i>
							<h5>No results</h5>
							<p>There are no fixtures matching your input.<br />Don't forget you can always create a custom fixture if needed.</p>
							<div className="space"></div>
							<nav className="center-align">
								<button onClick={() => { setSearchTerm(""); setOpen(false); focusCustomFixtureLabel(); }}>Create Custom Fixture</button>
							</nav>
						</div>
					</article>}
				</div>
			}
		</article>
	);
}

interface SearchBarProps {
	focusCustomFixtureLabel: () => void;
}
