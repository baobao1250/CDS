import create from "zustand";

const initialValues: ICurrentYear = {
	year: 2023,
	onSetValueYear: () => {},
};

type ICurrentYear = {
	year: any;
	onSetValueYear: (year: any) => void;
};

export const useCurrentYear = create<ICurrentYear>((set) => ({
	...initialValues,
	onSetValueYear: (year: any) => {
		return set((state) => ({
			...state,
			year: year,
		}));
	},
}));
