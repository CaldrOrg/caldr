import { useCaldrStore } from "@stores/index";
import { Icon3dCubeSphere, IconArrowBarBoth, IconArrowsShuffle, IconBackhoe, IconBolt, IconBoxPadding, IconCalculator, IconCloudCog, IconCloudRain, IconCoffee, IconCylinder, IconDeviceWatchCog, IconDimensions, IconDroplet, IconDropletUp, IconEngine, IconFilter, IconFireHydrant, IconFiretruck, IconGauge, IconHomeEco, IconNut, IconRefresh, IconRipple, IconSection, IconTemperaturePlus, IconTower, IconTransfer, IconTransform, IconWashEco, IconWashTemperature3 } from "@tabler/icons-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { Fragment } from "react/jsx-runtime";
import styles from "./styles.module.scss";

const links = [
	{
		name: "Plumbing",
		icon: "🔧",
		pages: [
			{ name: "Fixture Count", url: "/modules/plumbing/fixture_count", comp: IconCalculator },
			{ name: "Water Usage", url: "/modules/plumbing/water_usage", comp: IconDroplet },
			{ name: "DFU/ SFU to GPM", url: "/modules/plumbing/dfu_sfu_to_gpm", comp: IconTransform },
			{ name: "Flow Test", url: "/modules/plumbing/flow_test", comp: IconRipple },
			{ name: "Street Pressure", url: "/modules/plumbing/street_pressure", comp: IconGauge },
			{ name: "Water Pipe Sizer", url: "/modules/plumbing/water_pipe_sizer", comp: IconDimensions },
			{ name: "Water Softener", url: "/modules/plumbing/water_softener", comp: IconWashEco },
			{ name: "Water Heater", url: "/modules/plumbing/water_heater", comp: IconWashTemperature3 },
			{ name: "HwMixing Valve", url: "/modules/plumbing/hw_mixing_valve", comp: IconArrowsShuffle },
			{ name: "HwRecirculation", url: "/modules/plumbing/hw_recirculation", comp: IconRefresh },
			{ name: "Kitchen Heater", url: "/modules/plumbing/kitchen_heater", comp: IconCoffee },
			{ name: "Velocity / Friction", url: "/modules/plumbing/velocity_friction", comp: IconSection },
			{ name: "Booster Pump", url: "/modules/plumbing/booster_pump", comp: IconDropletUp },
			{ name: "Pipe Volume", url: "/modules/plumbing/pipe_volume", comp: Icon3dCubeSphere },
			{ name: "Thermal Expansion", url: "/modules/plumbing/thermal_expansion", comp: IconTemperaturePlus },
			{ name: "Linear Expansion", url: "/modules/plumbing/linear_expansion", comp: IconArrowBarBoth },
			{ name: "Building Drain", url: "/modules/plumbing/building_drain", comp: IconFilter },
			{ name: "Roof Drainage", url: "/modules/plumbing/roof_drainage", comp: IconHomeEco },
			{ name: "Storm Drain", url: "/modules/plumbing/storm_drain", comp: IconCloudRain },
			{ name: "Sump Pump", url: "/modules/plumbing/sump_pump", comp: IconBackhoe },
			{ name: "Sewage Pump", url: "/modules/plumbing/sewage_pump", comp: IconDeviceWatchCog },
			{ name: "Cooling Tower", url: "/modules/plumbing/cooling_tower", comp: IconTower },
			{ name: "Horsepower", url: "/modules/plumbing/horsepower", comp: IconEngine },
			{ name: "Mechanical Coordination", url: "/modules/plumbing/mechanical_coordination", comp: IconNut },
			{ name: "Electrical Coordination", url: "/modules/plumbing/electrical_coordination", comp: IconBolt },
		],
	},
	{
		name: "Medical Gas",
		icon: "💨",
		pages: [
			{ name: "Piping", url: "/modules/medical_gas/piping", comp: IconCylinder },
			{ name: "Flow", url: "/modules/medical_gas/flow", comp: IconTransfer },
			{ name: "Air Pump", url: "/modules/medical_gas/air_pump", comp: IconCloudCog },
			{ name: "Vacuum Pump", url: "/modules/medical_gas/vacuum_pump", comp: IconBoxPadding },
		],
	},
	{
		name: "Fire Protection",
		icon: "🔥",
		pages: [
			{ name: "Hydrant Flow Test", url: "/modules/fire_protection/hydrant_flow_test", comp: IconFireHydrant },
			{ name: "Fire Pump", url: "/modules/fire_protection/fire_pump", comp: IconFiretruck },
		],
	}
];

export default function Home({ }: HomeProps) {
	const { theme } = useCaldrStore();

	return (
		<main className="responsive">
			<Helmet>
				<title>Home | Caldr</title>
			</Helmet>

			<img
				src={theme === "light" ? "/caldr_logo.png" : "/caldr_logo_dark.png"}
				alt="Caldr Logo"
				className={styles.logo} />
			<h1>Welcome to Caldr</h1>

			{links.map(({ name, icon, pages }, i, a) => (
				<Fragment key={name}>
					<h4 className={styles.section}>{icon} {name}</h4>
					<div className={styles.grid}>
						{pages.map(({ name, url, comp: Icon }) => (
							<Fragment key={url}>
								<Link to={url}>
									<button className="responsive fill">
										<Icon size={24} className="" />
										<span>{name}</span>
									</button>
								</Link>
							</Fragment>
						))}
					</div>
					{i < a.length - 1 && <hr className="medium" />}
				</Fragment>
			))}
		</main>
	);
}

interface HomeProps {

}
