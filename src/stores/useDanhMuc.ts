import create from "zustand";
import { DanhMucDTO } from "../apis/baseService";
import { TypeDM } from "../apis/danhMucMgtService/danhMucMgtInterface";
import { DanhMucMgtService } from "../apis/danhMucMgtService/danhMucMgtService";

export interface IDanhMuc {
	[key: string]: Array<DanhMucDTO> | undefined;
}

const initialValues: IDanhMuc = {};

export const useDanhMuc = create<any>((set: any) => ({
	...initialValues,
	getDanhMuc: async (typeDm: TypeDM) => {
		const response = await new DanhMucMgtService().findAll(typeDm);
		console.log(response);
		return set((state: any) => ({
			...state,
			[`${typeDm}`]: response.data,
		}));
	},
}));
