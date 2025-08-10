import ModuleLayout from "@layouts/ModuleLayout";
import { useCaldrStore } from "@stores/index";
import { useState } from "react";

import styles from "./styles.module.scss";

export default function DfuStuToGpm({ }: DfuStuToGpmProps) {
	const { dfuToGpm, wsfuToGpm, hwsfuToGpm } = useCaldrStore();

	const [dfu, setDfu] = useState(0);
	const [wsfu, setWsfu] = useState(0);
	const [hwsfu, setHwsfu] = useState(0);

	return (
		<>
			<ModuleLayout
				moduleName="DFU / WSFU to GPM Conversion Calculator"
				moduleDescription="Convert Drainage, Supply, and Hot Water Fixture Units to Flow Rate"
				className={styles.dfuSfuToGpm}>

				<div>
					<label htmlFor="dfu">
						Drainage Fixture Units (DFU)
					</label>
					<div>
						<input
							id="dfu"
							type="number"
							placeholder="0"
							value={dfu}
							onChange={e => setDfu(e.currentTarget.valueAsNumber)} />
						<span>x 0.5 = {dfuToGpm(dfu || 0)} GPM</span>
					</div>
					<small>GPM = DFU x 0.5</small>
				</div>

				<div>
					<label htmlFor="wsfu">
						Water Supply Fixture Units (WSFU)
					</label>
					<div>
						<input
							id="wsfu"
							type="number"
							placeholder="0"
							value={wsfu}
							onChange={e => setWsfu(e.currentTarget.valueAsNumber)} />
						<span>x 0.6 = {wsfuToGpm(wsfu || 0)} GPM</span>
					</div>
					<small>GPM = WSFU x 0.6</small>
				</div>

				<div>
					<label htmlFor="hwsfu">
						Hot Water Supply Fixture Units (HWSFU)
					</label>
					<div>
						<input
							id="hwsfu"
							type="number"
							placeholder="0"
							value={hwsfu}
							onChange={e => setHwsfu(e.currentTarget.valueAsNumber)} />
						<span>x 0.7 = {hwsfuToGpm(hwsfu || 0)} GPM</span>
					</div>
					<small>GPM = HWSFU x 0.7</small>
				</div>

			</ModuleLayout>
		</>
	);
}

interface DfuStuToGpmProps {

}
