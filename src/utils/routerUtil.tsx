import { store } from "redux/store";

export function findPathRouter(key: string) {
    const routers = store.getState().menuReducer.router;
    const route = routers.find((item) => item.key === key);
    if (route) return route.duongDan;
    return "";
}
