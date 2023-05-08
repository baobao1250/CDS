import { produce } from "immer";
import { useCallback, useRef, useState } from "react";

const useImmerState = <T>(initialState: T) => {
	const [state, setState] = useState<T>(initialState);
	const nextState = useRef<T>(initialState);

	const setImmerState = useCallback((fn: (draftState: T) => void) => {
		setState((prevState) => {
			const newState = produce(prevState, fn);
			nextState.current = newState;

			return newState;
		});
	}, []);

	const getImmerState = useCallback(() => {
		return nextState.current;
	}, []);

	return [state, setImmerState, getImmerState] as const;
};

export default useImmerState;
