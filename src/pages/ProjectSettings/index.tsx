import ModuleLayout from "@layouts/ModuleLayout";
import { useCaldrStore } from "@stores/index";

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
				className="responsive">

				<h1>Project Settings</h1>

				<h3>General Settings</h3>

				<fieldset className="grid">
					<legend>Project Information</legend>

					<div className="s3 field label prefix border">
						<i>assignment</i>
						<input
							type="text"
							defaultValue={projectName}
							onChange={e => setProjectName(e.currentTarget.value)} />
						<label>Project Name</label>
					</div>

					<div className="s3 field label prefix border">
						<i>numbers</i>
						<input
							type="text"
							defaultValue={projectNumber}
							onChange={e => setProjectNumber(e.currentTarget.value)} />
						<label>Project Number</label>
					</div>

					<div className="s3 field label prefix border">
						<i>date_range</i>
						<input
							type="date"
							defaultValue={projectDate}
							onChange={e => setProjectDate(e.currentTarget.value)} />
						<label>Date</label>
					</div>

					<div className="s3 field label prefix border">
						<i>engineering</i>
						<input
							type="text"
							defaultValue={projectDesignerEngineer}
							onChange={e => setProjectDesignerEngineer(e.currentTarget.value)} />
						<label>Designer / Engineer</label>
					</div>
				</fieldset>


				<h3>Plumbing Settings</h3>

				<fieldset>
					<legend>Plumbing Code</legend>
					<nav>
						<label className="radio">
							<input
								type="radio"
								name="plumbingCode"
								value="ipc"
								checked={plumbingCode === "ipc"}
								onChange={() => setPlumbingCode("ipc")} />
							<span>IPC</span>
						</label>
						<label className="radio">
							<input
								type="radio"
								name="plumbingCode"
								value="upc"
								checked={plumbingCode === "upc"}
								onChange={() => setPlumbingCode("upc")} />
							<span>UPC</span>
						</label>
					</nav>
				</fieldset>
			</ModuleLayout>
		</>
	);
}

interface ProjectSettingsProps {

}
