import { LOCAL_STORE_KEY } from "commons/constants/constants";
import create from "zustand";
import { IAuth } from "../apis/userMgtService/userInterface";

const initialValues: IAuth = {
	avatar: null,
	userInfo: "",
};

type IUserMgt = {
	profile: IAuth | null;
	authSuccess: (payload: IAuth) => void;
	logOut: () => void;
};

export const useUser = create<IUserMgt>((set) => ({
	profile: initialValues,
	authSuccess: (payload: IAuth) => {
		payload.userInfo && localStorage.setItem(LOCAL_STORE_KEY.USER_DATA, JSON.stringify(payload.userInfo));
		payload.avatar !== undefined && localStorage.setItem(LOCAL_STORE_KEY.USER_AVATAR, payload.avatar != null ? payload.avatar : "");
		return set((state) => ({
			...state,
			profile: payload,
		}));
	},
	logOut: () => {
		localStorage.clear();
		window.location.href = "/admin/login";
		return set((state) => ({
			...state,
			profile: null,
		}));
	},
}));
