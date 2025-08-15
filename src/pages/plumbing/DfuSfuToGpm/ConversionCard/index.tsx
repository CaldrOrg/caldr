import clsx from "clsx";
import styles from "./styles.module.scss";

export function ConversionCard({ title, inputValue, setInputValue, outputValue, inputLabel, outputLabel, formula }: ConversionCardProps) {
	return (
		<article className={clsx("border", styles.card)}>
			<h5>{title}</h5>
			<div className="grid no-space">
				<div className="s5 field border">
					<input
						type="number"
						placeholder="0"
						value={inputValue}
						onChange={e => setInputValue(e.currentTarget.valueAsNumber)} />
				</div>
				<span className="s2">
					<h4>
						<center>=</center>
					</h4>
				</span>
				<div className="s5 field border">
					<input
						value={outputValue}
						readOnly />
				</div>
				<span className={clsx(styles.label, "s5 surface-container-highest")}>{inputLabel}</span>
				<span className="s2"></span>
				<span className={clsx(styles.label, "s5 surface-container-highest")}>{outputLabel}</span>
			</div>

			<br />

			<button className="chip amber-border amber-text">
				<span>Formula</span>
			</button>
			<code>{formula}</code>

		</article>
	);
}

export interface ConversionCardProps {
	title: string;
	inputValue: number;
	outputValue: string; setInputValue: (v: number) => void;
	inputLabel: string;
	outputLabel: string;
	formula: string;
}
