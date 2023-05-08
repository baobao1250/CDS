import create from "zustand";

const initialValues: IPageLoader = {
	text: "",
	isLoading: false,
	onLoading: () => {},
	setText: () => {},
};

type IPageLoader = {
	text: string;
	isLoading: boolean;
	onLoading: () => void;
	setText: (text: string) => void;
};

export const useLoader = create<IPageLoader>((set) => ({
	...initialValues,
	onLoading: () => {
		return set((state) => ({
			...state,
			isLoading: true,
		}));
	},
	setText: (text: string) => {
		return set((state) => ({
			...state,
			text: text,
		}));
	},
}));
