import { useCaldrStore } from "@stores/index";
import clsx from "clsx";

export default function DemandSummary({ className }: DemandSummaryProps) {
	const {
		plumbingCode,
		getTotalWsfu,
		getTotalHwsfu,
		getTotalDfu,
		getTotalWsfuGpm,
		getTotalHwsfuGpm,
		getTotalDfuGpm,
		getTotalHvacDemand,
		getTotalIrrigationDemand,
		getTotalOtherDemand
	} = useCaldrStore();
	return (
		<article className={clsx("border", className)}>
			<h5>Fixture Demand Summary</h5>

			<div className="space" />

			<ul className="list no-space">
				<li>
					<h6 className="max small">Total DFU</h6>
					<label>{getTotalDfu()}</label>
				</li>
				<li>
					<h6 className="max small">Total WSFU</h6>
					<label>{getTotalWsfu()}</label>
				</li>
				{plumbingCode === "ipc" && <li>
					<h6 className="max small">Total HWSFU</h6>
					<label>{getTotalHwsfu()}</label>
				</li>}
				<hr />
				<li>
					<h6 className="max small">DFU GPM</h6>
					<label>{getTotalDfuGpm()}</label>
				</li>
				<li>
					<h6 className="max small">WSFU GPM</h6>
					<label>{getTotalWsfuGpm()}</label>
				</li>
				{plumbingCode === "ipc" && <li>
					<h6 className="max small">HWSFU GPM</h6>
					<label>{getTotalHwsfuGpm()}</label>
				</li>}
				<hr />
				<li>
					<h6 className="max small">HVAC Demand</h6>
					<label>{getTotalHvacDemand()}</label>
				</li>
				<li>
					<h6 className="max small">Irrigation Demand</h6>
					<label>{getTotalIrrigationDemand()}</label>
				</li>
				<li>
					<h6 className="max small">Other Demand</h6>
					<label>{getTotalOtherDemand()}</label>
				</li>
			</ul>
		</article>
	);
}

interface DemandSummaryProps extends React.HTMLAttributes<HTMLElement> {

}
