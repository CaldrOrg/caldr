import { useCaldrStore } from "@stores/index";
import randomColor from "randomcolor";
import { useEffect, useState } from "react";

export default function SearchBar({ }: SearchBarProps) {
	const { knownFixtures, knownOccupancies, theme } = useCaldrStore();

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
		setSearchTerm("");
		setSearchOccupancy("");
	};


	return (
		<article className="grid" style={{ width: "100%", position: "absolute", zIndex: 2 }}>

			<div className="s8 field prefix postfix border round">
				<i>search</i>
				<input
					type="search"
					placeholder="Search for fixtures"
					value={searchTerm}
					onChange={e => setSearchTerm(e.currentTarget.value)}
				/>
				{searchTerm && <i onClick={() => setSearchTerm("")} style={{ zIndex: 3 }}>close</i>}
			</div>


			<div
				className="s4 field label suffix border"
				style={{ display: searchTerm ? "block" : "none" }}>
				<select value={searchOccupancy}
					onChange={e => setSearchOccupancy(e.currentTarget.value)}>
					<option></option>
					{knownOccupancies.map(occupancy => (
						<option key={occupancy} value={occupancy}>
							{occupancy}
						</option>
					))}
				</select>
				<label>Occupancy</label>
				<i>arrow_drop_down</i>
			</div>

			<div className="s12">
				{searchTerm && <ul className="list border" style={{ maxHeight: "50vh", overflowY: "auto" }}>
					{foundFixtures.map(fixture => (
						<li key={fixture.uuid}>
							{/* <i>home</i> */}
							<div className="max">
								<h6
									className="small"
									style={{ color: randomColor({ luminosity: theme === "light" ? "dark" : "light", seed: fixture.fixture }) }}>
									{fixture.fixture}
								</h6>
								<small>{
									[fixture.occupancy, fixture.variant]
										.filter(Boolean)
										.join(" - ")
								}</small>
							</div>
							<label style={{ flex: 0 }}>
								<div className="grid">
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
			</div>
		</article >
	);
}

interface SearchBarProps {

}
