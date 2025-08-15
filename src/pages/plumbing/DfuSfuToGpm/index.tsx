import ModuleLayout from "@layouts/ModuleLayout";
import { useCaldrStore } from "@stores/index";
import { useState } from "react";
import { ConversionCard } from "./ConversionCard";

export default function DfuStuToGpm({ }: DfuStuToGpmProps) {
	const { dfuToGpm, wsfuToGpm, hwsfuToGpm } = useCaldrStore();

	const [dfu, setDfu] = useState(0);
	const [wsfu, setWsfu] = useState(0);
	const [hwsfu, setHwsfu] = useState(0);

	return (
		<>
			<ModuleLayout
				moduleName="DFU / WSFU to GPM Conversion Calculator"
				moduleDescription="Convert Drainage, Supply, and Hot Water Fixture Units to Flow Rate">

				<div className="middle">
					<ConversionCard
						title="DFU to GPM"
						inputValue={dfu}
						outputValue={isNaN(dfu) ? "" : dfuToGpm(dfu) + ""}
						setInputValue={setDfu}
						inputLabel="Drainage Fixture Units (DFU)"
						outputLabel="Gallons Per Minute (GPM)"
						formula="GPM = DFU x 0.5" />

					<ConversionCard
						title="WSFU to GPM"
						inputValue={wsfu}
						outputValue={isNaN(wsfu) ? "" : wsfuToGpm(wsfu) + ""}
						setInputValue={setWsfu}
						inputLabel="Water Supply Fixture Units (WSFU)"
						outputLabel="Gallons Per Minute (GPM)"
						formula="GPM = WSFU x 0.6" />

					<ConversionCard
						title="HWSFU to GPM"
						inputValue={hwsfu}
						outputValue={isNaN(hwsfu) ? "" : hwsfuToGpm(hwsfu) + ""}
						setInputValue={setHwsfu}
						inputLabel="Hot Water Supply Fixture Units (HWSFU)"
						outputLabel="Gallons Per Minute (GPM)"
						formula="GPM = HWSFU x 0.7" />
				</div>

			</ModuleLayout>
		</>
	);
}

interface DfuStuToGpmProps {

}
