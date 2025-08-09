import ModuleLayout from "../../../layouts/ModuleLayout";
import styles from "./styles.module.scss";

export default function DfuStuToGpm({ }: DfuStuToGpmProps) {
	// const [dfu, setDfu] = useState<number>(0);


	return (
		<>
			<ModuleLayout
				moduleName="DFU / WSFU to GPM Conversion Calculator"
				moduleDescription="Convert Drainage, Supply, and Hot Water Fixture Units to Flow Rate">
				<div className={styles.dfuSfuToGpm}>
					<input type="number" placeholder="0" />
					<span>x 0.5 =</span>
					{/* <input readOnly value={ } /> */}
				</div>
			</ModuleLayout>
		</>
	);
}

interface DfuStuToGpmProps {

}
