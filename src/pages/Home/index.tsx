import CaldrLogo from "@assets/caldr_logo.png";
import { Icon3dCubeSphere, IconArrowBarBoth, IconArrowsShuffle, IconBackhoe, IconBolt, IconBoxPadding, IconCalculator, IconCloudCog, IconCloudRain, IconCoffee, IconCylinder, IconDeviceWatchCog, IconDimensions, IconDroplet, IconDropletUp, IconEngine, IconFilter, IconFireHydrant, IconFiretruck, IconGauge, IconHomeEco, IconNut, IconRefresh, IconRipple, IconSection, IconTemperaturePlus, IconTower, IconTransfer, IconTransform, IconWashEco, IconWashTemperature3 } from "@tabler/icons-react";
import { Link } from "react-router";
import styles from "./styles.module.scss";

export default function Home({ }: HomeProps) {
	return (
		<div className={styles.home}>
			<img src={CaldrLogo} alt="Caldr Logo" />
			<h1>Welcome to Caldr</h1>

			<h2>🔧 Plumbing</h2>
			<div className={styles.grid}>
				<Link to="/modules/plumbing/fixture_count">
					<IconCalculator />
					<span>Fixture Count</span>
				</Link>
				<Link to="/modules/plumbing/water_usage">
					<IconDroplet />
					<span>Water Usage</span>
				</Link>
				<Link to="/modules/plumbing/dfu_sfu_to_gpm">
					<IconTransform />
					<span>DFU/ SFU to GPM</span>
				</Link>
				<Link to="/modules/plumbing/flow_test">
					<IconRipple />
					<span>Flow Test</span>
				</Link>
				<Link to="/modules/plumbing/street_pressure">
					<IconGauge />
					<span>Street Pressure</span>
				</Link>
				<Link to="/modules/plumbing/water_pipe_sizer">
					<IconDimensions />
					<span>Water Pipe Sizer</span>
				</Link>
				<Link to="/modules/plumbing/water_softener">
					<IconWashEco />
					<span>Water Softener</span>
				</Link>
				<Link to="/modules/plumbing/water_heater">
					<IconWashTemperature3 />
					<span>Water Heater</span>
				</Link>
				<Link to="/modules/plumbing/hw_mixing_valve">
					<IconArrowsShuffle />
					<span>HwMixing Valve</span>
				</Link>
				<Link to="/modules/plumbing/hw_recirculation">
					<IconRefresh />
					<span>HwRecirculation</span>
				</Link>
				<Link to="/modules/plumbing/kitchen_heater">
					<IconCoffee />
					<span>Kitchen Heater</span>
				</Link>
				<Link to="/modules/plumbing/velocity_friction">
					<IconSection />
					<span>Velocity / Friction</span>
				</Link>
				<Link to="/modules/plumbing/booster_pump">
					<IconDropletUp />
					<span>Booster Pump</span>
				</Link>
				<Link to="/modules/plumbing/pipe_volume">
					<Icon3dCubeSphere />
					<span>Pipe Volume</span>
				</Link>
				<Link to="/modules/plumbing/thermal_expansion">
					<IconTemperaturePlus />
					<span>Thermal Expansion</span>
				</Link>
				<Link to="/modules/plumbing/linear_expansion">
					<IconArrowBarBoth />
					<span>Linear Expansion</span>
				</Link>
				<Link to="/modules/plumbing/building_drain">
					<IconFilter />
					<span>Building Drain</span>
				</Link>
				<Link to="/modules/plumbing/roof_drainage">
					<IconHomeEco />
					<span>Roof Drainage</span>
				</Link>
				<Link to="/modules/plumbing/storm_drain">
					<IconCloudRain />
					<span>Storm Drain</span>
				</Link>
				<Link to="/modules/plumbing/sump_pump">
					<IconBackhoe />
					<span>Sump Pump</span>
				</Link>
				<Link to="/modules/plumbing/sewage_pump">
					<IconDeviceWatchCog />
					<span>Sewage Pump</span>
				</Link>
				<Link to="/modules/plumbing/cooling_tower">
					<IconTower />
					<span>Cooling Tower</span>
				</Link>
				<Link to="/modules/plumbing/horsepower">
					<IconEngine />
					<span>Horsepower</span>
				</Link>
				<Link to="/modules/plumbing/mechanical_coordination">
					<IconNut />
					<span>Mechanical Coordination</span>
				</Link>
				<Link to="/modules/plumbing/electrical_coordination">
					<IconBolt />
					<span>Electrical Coordination</span>
				</Link>
			</div>

			<h2>💨 Medical Gas</h2>
			<div className={styles.grid}>
				<Link to="/modules/medical_gas/piping">
					<IconCylinder />
					<span>Piping</span>
				</Link>
				<Link to="/modules/medical_gas/flow">
					<IconTransfer />
					<span>Flow</span>
				</Link>
				<Link to="/modules/medical_gas/air_pump">
					<IconCloudCog />
					<span>Air Pump</span>
				</Link>
				<Link to="/modules/medical_gas/vacuum_pump">
					<IconBoxPadding />
					<span>Vacuum Pump</span>
				</Link>
			</div>

			<h2>🔥 Fire Protection</h2>
			<div className={styles.grid}>
				<Link to="/modules/fire_protection/hydrant_flow_test">
					<IconFireHydrant />
					<span>Hydrant Flow Test</span>
				</Link>
				<Link to="/modules/fire_protection/fire_pump">
					<IconFiretruck />
					<span>Fire Pump</span>
				</Link>
			</div>
		</div>
	);
}

interface HomeProps {

}
