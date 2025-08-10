import ModuleLayout from "@layouts/ModuleLayout";
import { useCaldrStore } from "@stores/index";

import styles from "./styles.module.scss";

export default function ProjectSettings({ }: ProjectSettingsProps) {
	const {
		projectName,
		setProjectName,
		projectNumber,
		setProjectNumber,
		projectDate,
		setProjectDate,
		projectDesignerEngineer,
		setProjectDesignerEngineer,
		plumbingCode,
		setPlumbingCode,
	} = useCaldrStore();

	return (
		<>
			<ModuleLayout
				moduleName="Project Settings"
				moduleDescription="Configure project details and settings for your plumbing design."
				className={styles.projectSettings}>

				<h1>Project Settings</h1>

				<h2>General Settings</h2>

				<label>
					Project Name
					<input
						type="text"
						placeholder="Enter project name"
						defaultValue={projectName}
						onChange={e => setProjectName(e.currentTarget.value)} />
				</label>
				<label>
					Project Number
					<input
						type="text"
						placeholder="Enter project number"
						defaultValue={projectNumber}
						onChange={e => setProjectNumber(e.currentTarget.value)} />
				</label>
				<label>
					Date
					<input
						type="date"
						defaultValue={projectDate}
						onChange={e => setProjectDate(e.currentTarget.value)} />
				</label>
				<label>
					Designer / Engineer
					<input
						type="text"
						placeholder="Enter name"
						defaultValue={projectDesignerEngineer}
						onChange={e => setProjectDesignerEngineer(e.currentTarget.value)} />
				</label>

				<h2>Plumbing Settings</h2>

				<label>
					Plumbing Code
					<span>
						<label>
							IPC
							<input
								type="radio"
								name="plumbingCode"
								value="ipc"
								checked={plumbingCode === "ipc"}
								onChange={() => setPlumbingCode("ipc")} />
						</label>
						<label>
							UPC
							<input
								type="radio"
								name="plumbingCode"
								value="upc"
								checked={plumbingCode === "upc"}
								onChange={() => setPlumbingCode("upc")} />
						</label>
					</span>
				</label>
			</ModuleLayout>
		</>
	);
}

interface ProjectSettingsProps {

}
