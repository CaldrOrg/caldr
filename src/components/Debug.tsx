export default function Debug({ data }: DebugProps) {
	return (
		<>
			<code>
				<pre>
					{JSON.stringify(data, null, 4)}
				</pre>
			</code>
		</>
	);
}

interface DebugProps {
	data?: unknown;
}
