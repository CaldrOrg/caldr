import FirePump from "@pages/fire_protection/FirePump";
import HydrantFlowTest from "@pages/fire_protection/HydrantFlowTest";
import Fixtures from "@pages/fixtures";
import Home from "@pages/Home";
import AirPump from "@pages/medical_gas/AirPump";
import Flow from "@pages/medical_gas/Flow";
import Piping from "@pages/medical_gas/Piping";
import VacuumPump from "@pages/medical_gas/VacuumPump";
import BoosterPump from "@pages/plumbing/BoosterPump";
import BuildingDrain from "@pages/plumbing/BuildingDrain";
import CoolingTower from "@pages/plumbing/CoolingTower";
import DfuSfuToGpm from "@pages/plumbing/DfuSfuToGpm";
import ElectricalCoordination from "@pages/plumbing/ElectricalCoordination";
import FixtureCount from "@pages/plumbing/FixtureCount";
import FlowTest from "@pages/plumbing/FlowTest";
import HorsePower from "@pages/plumbing/HorsePower";
import HwMixingValve from "@pages/plumbing/HwMixingValve";
import HwRecirculation from "@pages/plumbing/HwRecirculation";
import KitchenHeater from "@pages/plumbing/KitchenHeater";
import LinearExpansion from "@pages/plumbing/LinearExpansion";
import MechanicalCoordination from "@pages/plumbing/MechanicalCoordination";
import PipeVolume from "@pages/plumbing/PipeVolume";
import RoofDrainage from "@pages/plumbing/RoofDrainage";
import SewagePump from "@pages/plumbing/SewagePump";
import StormDrain from "@pages/plumbing/StormDrain";
import StreetPressure from "@pages/plumbing/StreetPressure";
import SumpPump from "@pages/plumbing/SumpPump";
import ThermalExpansion from "@pages/plumbing/ThermalExpansion";
import VelocityFriction from "@pages/plumbing/VelocityFriction";
import WaterHeater from "@pages/plumbing/WaterHeater";
import WaterPipeSizer from "@pages/plumbing/WaterPipeSizer";
import WaterSoftener from "@pages/plumbing/WaterSoftener";
import WaterUsage from "@pages/plumbing/WaterUsage";
import ProjectSettings from "@pages/ProjectSettings";

import { StrictMode, useCallback, useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router";

import "./main.scss";
import { useCaldrStore } from "./stores";

export function App() {
	const { setTheme } = useCaldrStore();

	const mediaQueryList = useMemo(() => window.matchMedia("(prefers-color-scheme: dark)"), []);
	const handler = useCallback((event: MediaQueryListEvent) => setTheme(event.matches ? "dark" : "light"), [setTheme]);

	useEffect(() => {
		mediaQueryList.addEventListener("change", handler);
		setTheme(mediaQueryList.matches ? "dark" : "light");

		return () => {
			mediaQueryList.removeEventListener("change", handler);
		};
	}, [mediaQueryList, handler, setTheme]);

	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Home />} />
				<Route path="fixtures" element={<Fixtures />} />
				<Route path="project_settings" element={<ProjectSettings />} />
				<Route path="modules">
					<Route path="plumbing">
						<Route path="fixture_count" element={<FixtureCount />} />
						<Route path="water_usage" element={<WaterUsage />} />
						<Route path="dfu_sfu_to_gpm" element={<DfuSfuToGpm />} />
						<Route path="flow_test" element={<FlowTest />} />
						<Route path="street_pressure" element={<StreetPressure />} />
						<Route path="water_pipe_sizer" element={<WaterPipeSizer />} />
						<Route path="water_softener" element={<WaterSoftener />} />
						<Route path="water_heater" element={<WaterHeater />} />
						<Route path="hw_mixing_valve" element={<HwMixingValve />} />
						<Route path="hw_recirculation" element={<HwRecirculation />} />
						<Route path="kitchen_heater" element={<KitchenHeater />} />
						<Route path="velocity_friction" element={<VelocityFriction />} />
						<Route path="booster_pump" element={<BoosterPump />} />
						<Route path="pipe_volume" element={<PipeVolume />} />
						<Route path="thermal_expansion" element={<ThermalExpansion />} />
						<Route path="linear_expansion" element={<LinearExpansion />} />
						<Route path="building_drain" element={<BuildingDrain />} />
						<Route path="roof_drainage" element={<RoofDrainage />} />
						<Route path="storm_drain" element={<StormDrain />} />
						<Route path="sump_pump" element={<SumpPump />} />
						<Route path="sewage_pump" element={<SewagePump />} />
						<Route path="cooling_tower" element={<CoolingTower />} />
						<Route path="horsepower" element={<HorsePower />} />
						<Route path="mechanical_coordination" element={<MechanicalCoordination />} />
						<Route path="electrical_coordination" element={<ElectricalCoordination />} />
					</Route>
					<Route path="medical_gas">
						<Route path="piping" element={<Piping />} />
						<Route path="flow" element={<Flow />} />
						<Route path="air_pump" element={<AirPump />} />
						<Route path="vacuum_pump" element={<VacuumPump />} />
					</Route>
					<Route path="fire_protection">
						<Route path="hydrant_flow_test" element={<HydrantFlowTest />} />
						<Route path="fire_pump" element={<FirePump />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}


createRoot(document.getElementById("root")!)
	.render(
		<StrictMode>
			<HelmetProvider>
				<Helmet>
					<title>Caldr</title>
					<link rel="icon" href="/favicon.png" />
					<meta charSet="utf-8" />
				</Helmet>
				<App />
			</HelmetProvider>
		</StrictMode>
	);
