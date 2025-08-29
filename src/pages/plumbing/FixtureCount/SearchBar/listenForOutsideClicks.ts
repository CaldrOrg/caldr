// https://github.com/Pomax/react-onclickoutside?tab=readme-ov-file#functional-component-with-usestate-hook
export function listenForOutsideClicks<T>(listening: boolean, setListening: (listening: boolean) => void, ref: React.RefObject<T | null>, handler: () => void) {
	return () => {
		if(listening) return;
		if(!ref.current) return;

		setListening(true);
		[`click`, `touchstart`]
			.forEach(type => document
				.addEventListener(type, evt => ref
					.current
					// @ts-ignore
					?.contains(evt.target)
					? undefined
					: handler()));
	};
}
