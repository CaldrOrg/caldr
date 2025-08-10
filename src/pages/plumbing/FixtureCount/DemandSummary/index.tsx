import { useCaldrStore } from "@stores/index";
import styles from "./styles.module.scss";

export default function DemandSummary({ }: DemandSummaryProps) {
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
		<div className={styles.demandSummary}>
			<h2>Fixture Demand Summary</h2>

			<ul>
				<li><span>Total WSFU: </span>{getTotalWsfu()}</li>
				{plumbingCode === "ipc" && <li><span>Total HWSFU: </span>{getTotalHwsfu()}</li>}
				<li><span>Total DFU: </span>{getTotalDfu()}</li>
				<hr />
				<li><span>WSFU GPM: </span>{getTotalWsfuGpm()}</li>
				{plumbingCode === "ipc" && <li><span>HWSFU GPM: </span>{getTotalHwsfuGpm()}</li>}
				<li><span>DFU GPM: </span>{getTotalDfuGpm()}</li>
				<hr />
				<li><span>HVAC Demand: </span>{getTotalHvacDemand()}</li>
				<li><span>Irrigation Demand: </span>{getTotalIrrigationDemand()}</li>
				<li><span>Other Demand: </span>{getTotalOtherDemand()}</li>
			</ul>
		</div>
	);
}

interface DemandSummaryProps {

}
