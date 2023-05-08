export interface DanhMucDTO {
	id: Number | null;
	name: String;
	code: String;
	description?: String;
	active?: boolean;
	delete?: boolean;
}

export interface Pagination<T extends Iterable<any>> {
	// data: {
	// 	content: T;
	// 	size: number;
	// 	totalElements: number;
	// 	totalPages: number;
	// };
	content: T;
	size: number;
	totalElements: number;
	totalPages: number;
}

export enum SearchType {
	"BASIC" = "CO_BAN",
	"ADVANCED" = "NANG_CAO"
};

export const ACTIVE_VALUES = [
	{
		title: "Tất cả",
		value: 0,
	},
	{
		title: "Hoạt động",
		value: 1,
	},
	{
		title: "Ngừng hoạt động",
		value: 2,
	},
];

export const LOCKED_VALUES = [
	{
		title: "Tất cả",
		value: 0,
	},
	{
		title: "Đã bị khóa",
		value: 1,
	},
	{
		title: "Đang hoạt động",
		value: 2,
	},
];

export interface PageRequest {
	searchType: SearchType;
	pageSize: number;
	pageNumber: number;
	keywords?: string;
	active?: any;
	direction?: string;
	sortBy?: string;
}

export const initPageRequest: PageRequest = {
	searchType: SearchType.BASIC,
	pageNumber: 0,
	pageSize: 10,
	keywords: "",
};

export interface ParamExport extends PageRequest {
	downloadType?: String;
}

export interface BaseResponse {
	isSuccess: boolean;
	message: string;
	data?: any;
	description?: any;
}

export interface DataResponse<T> {
	code: number;
	description: string;
	message: string;
	result?: T;
}

export interface BaseReponseI<T> {
	isSuccess: boolean;
	message: string;
	data: T;
}

export class BaseService {
	protected getTokenRequestHeaders = () => {
		return {
			headers: {
				"Content-Type": "application/json",
			},
		};
	};
}

export enum ResponseCode {
	CONFLICT = "409",
	NOT_FOUND = "404",
	SUCCESS = "200",
	BAD_REQUEST = "400",
}
