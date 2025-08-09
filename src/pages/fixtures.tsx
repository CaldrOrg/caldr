import fixtures from "@assets/fixtures";
import ReactJson from "react-json-view";

export default function Fixtures() {
	return (
		<>
			<ReactJson src={fixtures} theme="monokai" style={{ padding: "1rem" }} />
			{/* <code>
				<pre>
					{JSON.stringify(fixtures, null, 2)}
				</pre>
			</code> */}
		</>
	);
}
