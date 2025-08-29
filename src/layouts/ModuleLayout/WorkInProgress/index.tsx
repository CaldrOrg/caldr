import { IconArrowBack, IconBarrierBlock } from "@tabler/icons-react";
import { Link } from "react-router";

export default function WorkInProgress({ }: WorkInProgressProps) {
	return (
		<article className="center-align middle center large-width">
			<div>
				<IconBarrierBlock size={64} />
				<h5>Work in Progress</h5>
				<p>Check back soon!</p>
				<div className="space"></div>
				<nav className="center-align">
					<Link to="/">
						<button className="responsive">
							<IconArrowBack size={24} />
							<span>Back to Home</span>
						</button>
					</Link>
				</nav>
			</div>
		</article>
	);
}

interface WorkInProgressProps {

}
