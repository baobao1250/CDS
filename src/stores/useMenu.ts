import { LOCAL_STORE_KEY } from "commons/constants/constants";
import { ROOT_ROUTER as ROOT_ROUTER_HOST } from "host/routes/rootRouter";
import React from "react";
import create from "zustand";
import { DataResponse } from "../apis/baseService";
import { LoaiVanBanService } from "../apis/danhMucLoaiVanBanService/danhMucLoaiVanBanService";
import { ThongBaoNhacViecService } from "../apis/thongBaoNhacViec/thongBaoNhacViecService";
import { UserManagementService } from "../apis/userMgtService/userManagementService";
import { RoutePropsI } from "../routes/rootRouter";

export type DrawMenuI = {
    id: number;
    parentId: number;
    path_: string;
    icon: string;
    name: string;
    code: string;
    url: string;
    priority: number;
    active: boolean;
    child: DrawMenuI[];
    roleList: string[];
    siteCode: string;
    state?: string;
    select?: boolean;
    khanCap?: number;
    quanTrong?: number;
    isCounter?: boolean;
    isCounterParent?: boolean;
    breadCrumb?: { name: string; url: string }[];
};

export type DrawMenuIResult = {
    result: DrawMenuI[];
};

type IMenu = {
    menus: DrawMenuI[];
    menuSelected: DrawMenuI | null;
    currentMenu: DrawMenuI | null;
    routeForUser: RoutePropsI[];
    getLeftMenu: (userId: string, log?: any) => void;
    selectMenu: (menuSelect: DrawMenuI, currentMenu: DrawMenuI) => void;
    handleEdit: () => void;
    isEdit: boolean;
};

export type DanhMucI = {
    idLoaiVanBan: number;
    tenVanBan: string;
    countVanBan: number;
    capVanBan: number;
};
export type ConditionI = {
    level: number;
    key: string;
};

import _get from "lodash/get";
// const userInfo = _get(localStorage.getItem(LOCAL_STORE_KEY.USER_DATA),"{}");
// const userInfoJson = React.useState(userInfo?JSON.parse(userInfo):{});

// const DUMMY_DATA: Array<DanhMucI> = [
//     { idLoaiVanBan: 1, countVanBan: 10, tenVanBan: "Nghị Quyết" },
//     { idLoaiVanBan: 1, countVanBan: 12, tenVanBan: "Chương Trình" },
//     { idLoaiVanBan: 4, countVanBan: 11, tenVanBan: "Kế hoạch" },
// ];

function handleReduceData(menus: DrawMenuI[], acc: DrawMenuI[], data?: any): DrawMenuI[] {
    if (menus) {
        const result = menus.reduce((acc, item) => {
            let path = item.path_;
            if (
                data != undefined &&
                (item.path_ === "NghiQuyet" || item.path_ === "NghiQuyet2" || item.path_ === "NghiQuyet3" || item.path_ === "NghiQuyet4")
            ) {
                return [
                    {
                        ...item,
                        child: data.map((item: any) => ({
                            active: true,
                            id: Math.random() * 1000,
                            // path_: "NghiQuyet2",
                            path_: path,
                            name: item.tenVanBan,
                            url: `/nghi-quyet-cap-${
                                path == "NghiQuyet" ? 1 : path == "NghiQuyet2" ? 2 : path == "NghiQuyet3" ? 3 : path == "NghiQuyet4" ? 4 : 1
                            }`,
                            breadCrumb: [
                                ...item.breadCrumb,
                                {
                                    name: item.tenVanBan,
                                    url: `/nghi-quyet-cap-${
                                        path == "NghiQuyet"
                                            ? 1
                                            : path == "NghiQuyet2"
                                            ? 2
                                            : path == "NghiQuyet3"
                                            ? 3
                                            : path == "NghiQuyet4"
                                            ? 4
                                            : 1
                                    }`,
                                },
                            ],
                        })),
                    },
                ] as DrawMenuI[];
            }
            if (item.child.length > 0) {
                return [...acc, { ...item, child: handleReduceData(item.child, acc, data) }];
            }
            return [...acc, item];
        }, acc);

        return result;
    }
    return [];
}

function handleMapData(menus: DrawMenuI[], count: DanhMucI[], countQTKC: any[]) {
    return menus.map((item) => {
        let newItem = handleMapCount(item, count, countQTKC);
        if (item.child && item.child.length > 0) {
            newItem.child = handleMapData(
                item.child?.map((it: DrawMenuI) => ({ ...it, breadCrumb: newItem.breadCrumb ? [...newItem.breadCrumb] : [] })),
                count,
                countQTKC
            );
        }
        return newItem;
    });
}
function handleMapCount(item: DrawMenuI, count: DanhMucI[], countQTKC: any[]) {
    let paths = ["NghiQuyet", "NghiQuyet2", "NghiQuyet3", "NghiQuyet4"];
    let arrCount = count.filter((e) => {
        if (item.path_ == "NghiQuyet") {
            return e.capVanBan == 1;
        }
        if (item.path_ == "NghiQuyet2") {
            return e.capVanBan == 2;
        }
        if (item.path_ == "NghiQuyet3") {
            return e.capVanBan == 3;
        }
        if (item.path_ == "NghiQuyet4") {
            return e.capVanBan == 4;
        }
    });
    //HienLT52 - SetCount [KhanCapQuanTrong]
    if (countQTKC != undefined || (countQTKC != null && Object.values(countQTKC).length)) {
        if (item.path_ === "KhanCap") {
            return { ...item, khanCap: Object.values(countQTKC)[0] };
        }
        if (item.path_ === "QuanTrong") {
            return { ...item, quanTrong: Object.values(countQTKC)[1] };
        }
    }
    if (paths.includes(item.path_)) {
        let bcr = item.breadCrumb
            ? [
                  ...item.breadCrumb,
                  {
                      name: item.name,
                      url: item.url,
                  },
              ]
            : [
                  {
                      name: item.name,
                      url: item.url,
                  },
              ];
        return {
            ...item,
            select: true,
            breadCrumb: bcr,
            state: JSON.stringify({
                breadCrumb: [...bcr],
            }),
            child: [
                ...arrCount.map((c, idx) => ({
                    active: true,
                    id: Math.random() * 1000,
                    path_: `${item.path_}-${idx}`,
                    name: c.tenVanBan,
                    url: `/nghi-quyet-cap-${c.capVanBan}-${idx}`,
                    state: JSON.stringify({
                        ...c,
                        breadCrumb: [
                            ...bcr,
                            {
                                name: c.tenVanBan,
                                url: "",
                            },
                        ],
                    }),
                    child: [] as DrawMenuI[],
                })),
            ] as DrawMenuI[],
        };
    }

    return {
        ...item,
        state: JSON.stringify({
            breadCrumb: item.breadCrumb
                ? [
                      ...item.breadCrumb,
                      {
                          name: item.name,
                          url: item.url,
                      },
                  ]
                : [
                      {
                          name: item.name,
                          url: item.url,
                      },
                  ],
        }),
        breadCrumb: item.breadCrumb
            ? [
                  ...item.breadCrumb,
                  {
                      name: item.name,
                      url: item.url,
                  },
              ]
            : [
                  {
                      name: item.name,
                      url: item.url,
                  },
              ],
    };
}

export const useMenu = create<IMenu>((set) => ({
    menus: [],
    menuSelected: null,
    currentMenu: null,
    routeForUser: [],
    isEdit: false,
    getLeftMenu: async (userId: string, year?: any) => {
        const USER_DATA = localStorage.getItem(LOCAL_STORE_KEY.USER_DATA);
        const decode = USER_DATA ? JSON.parse(USER_DATA) : {};
        const siteCode = decode.siteCode ? decode.siteCode : "";
        const orgCode = decode.orgCode ? decode.orgCode : "";
        const namHT = new Date().getFullYear();
        const res = await new UserManagementService().getMenu(userId, siteCode);

        // NQCT
        if (siteCode === "NQCT") {
            let response: any = await new LoaiVanBanService().getCountVanBan(orgCode, year ?? namHT);
            let responseQTKC: any = await new LoaiVanBanService().getCountQuanTrongKhanCap(userId, year ?? namHT);
            let countQTKC: any[] = [];
            if (response.data.code == 200) {
                countQTKC = responseQTKC.data.result;
            }
            let danhMuc: DanhMucI[] = [];
            var countCap1: number = 0;
            let countCap2: number = 0;
            let countCap3: number = 0;
            let countCap4: number = 0;
            if (response.data.code == 200) {
                danhMuc = [...(response.data.result.filter((e: DanhMucI) => e.countVanBan > 0) as DanhMucI[])];

                response.data.result &&
                    response.data.result.length > 0 &&
                    response.data.result.map((e: DanhMucI) => {
                        if (e.capVanBan == 1) {
                            countCap1 += e.countVanBan;
                        } else if (e.capVanBan == 2) {
                            countCap2 += e.countVanBan;
                        } else if (e.capVanBan == 3) {
                            countCap3 += e.countVanBan;
                        } else if (e.capVanBan == 4) {
                            countCap4 += e.countVanBan;
                        }
                    });
            }
            const result = handleMapData(res.data.result, danhMuc, countQTKC);
            let routeForUser: RoutePropsI[] = [];
            let arrayNode: DrawMenuI[] = [];

            result.forEach((item) => {
                arrayNode.push(...convertTreeToList(item));
            });

            arrayNode.forEach((item) => {

                let route = addRouterRouter(danhMuc, item).find((p: RoutePropsI) => {
                    item.path_.includes("NghiQuyet") &&
                        p.key.includes("NghiQuyet") ;
                    return item.url && item.path_ === p.key;
                });
                if (route) {
                    routeForUser.push({ ...route, duongDan: item.url ? item.url : "" });
                }
            });

            return set((state) => ({
                ...state,
                menus: result ? result : [],
                routeForUser: routeForUser,
            }));
        }

        // NVTT
        let routeForUser: RoutePropsI[] = [];
        let arrayNode: DrawMenuI[] = [];
        res.data.result.forEach((item) => {
            arrayNode.push(...convertTreeToList(item));
        });

        arrayNode.forEach((item) => {
            let route = ROOT_ROUTER_HOST.find((p: RoutePropsI) => {
                return item.url && item.path_ === p.key;
            });
            if (route) {
                routeForUser.push({ ...route, duongDan: item.url ? item.url : "" });
            }
        });

        return set((state) => ({
            ...state,
            menus: res.data.result,
            routeForUser: routeForUser,
        }));
    },

    selectMenu(menuSelect, currentMenu) {
        return set((state) => ({
            ...state,
            menuSelected: menuSelect,
            currentMenu: currentMenu,
        }));
    },
    handleEdit() {
        return set((state) => ({
            ...state,
            isEdit: !state.isEdit,
        }));
    },
}));

function addRouterRouter(danhMuc: DanhMucI[], drawMenu: DrawMenuI) {
    // const arrMap: ConditionI[] = [
    //     { level: 1, key: "NghiQuyet" },
    //     { level: 2, key: "NghiQuyet2" },
    // { level: 3, key: "NghiQuyet3" },
    // { level: 4, key: "NghiQuyet4" },
    // ];
    // return [
    //     ...ROOT_ROUTER_HOST,
    //     ...danhMuc.map((vb, idx) => {
    //         if (vb.capVanBan) {
    //             let key = "NghiQuyet" + vb.capVanBan;

    //             return {
    //                 ten: vb.tenVanBan,
    //                 GiaoDien: ROOT_ROUTER_HOST.find((route: any) => route.key == key)?.GiaoDien,
    //                 key: `${key}-${idx}`,
    //                 duongDan: `/nghi-quyet-cap-${vb.capVanBan}`,
    //                 props: {
    //                     capVanBan: vb.capVanBan,
    //                 },
    //             };
    //         }
    //     }),

    //     // ...arrMap.map((element) => {
    //     //     return routerAdd
    //     //         .filter((vb) => vb.capVanBan == element.level)
    //     //         .map((vb2, idx) => ({
    //     //             ten: vb2.tenVanBan,
    //     //             GiaoDien: ROOT_ROUTER_HOST.find((route: any) => route.key == element.key)?.GiaoDien,
    //     //             key: `${element.key}-${idx}`,
    //     //             duongDan: `/nghi-quyet-cap-${
    //     //                 drawMenu.path_ == "NghiQuyet"
    //     //                     ? 1
    //     //                     : drawMenu.path_ == "NghiQuyet2"
    //     //                     ? 2
    //     //                     : drawMenu.path_ == "NghiQuyet3"
    //     //                     ? 3
    //     //                     : drawMenu.path_ == "NghiQuyet4"
    //     //                     ? 4
    //     //                     : 1
    //     //             }`,
    //     //             props: {
    //     //                 capVanBan: vb2.capVanBan,
    //     //             },
    //     //         }));
    //     // }),
    // ];

    return [
        ...ROOT_ROUTER_HOST,
        ...danhMuc
            .filter((vb) => vb.capVanBan == 1)
            .map((vb2, idx) => ({
                ten: vb2.tenVanBan,
                GiaoDien: ROOT_ROUTER_HOST.find((route: any) => route.key === "NghiQuyet")?.GiaoDien,
                key: `NghiQuyet-${idx}`,
                duongDan: `/nghi-quyet-cap-${vb2.capVanBan}`,
                props: {
                    capVanBan: vb2.capVanBan,
                },
            })),
        ...danhMuc
            .filter((vb) => vb.capVanBan == 2)
            .map((vb2, idx) => ({
                ten: vb2.tenVanBan,
                GiaoDien: ROOT_ROUTER_HOST.find((route: any) => route.key === "NghiQuyet2")?.GiaoDien,
                key: `NghiQuyet2-${idx}`,
                duongDan: `/nghi-quyet-cap-${vb2.capVanBan}`,
                props: {
                    capVanBan: vb2.capVanBan,
                },
            })),
        ...danhMuc
            .filter((vb) => vb.capVanBan == 3)
            .map((vb2, idx) => ({
                ten: vb2.tenVanBan,
                GiaoDien: ROOT_ROUTER_HOST.find((route: any) => route.key === "NghiQuyet3")?.GiaoDien,
                key: `NghiQuyet3-${idx}`,
                duongDan: `/nghi-quyet-cap-${vb2.capVanBan}`,
                props: {
                    capVanBan: vb2.capVanBan,
                },
            })),
        ...danhMuc
            .filter((vb) => vb.capVanBan == 4)
            .map((vb2, idx) => ({
                ten: vb2.tenVanBan,
                GiaoDien: ROOT_ROUTER_HOST.find((route: any) => route.key === "NghiQuyet4")?.GiaoDien,
                key: `NghiQuyet4-${idx}`,
                duongDan: `/nghi-quyet-cap-${vb2.capVanBan}`,
                props: {
                    capVanBan: vb2.capVanBan,
                },
            })),
    ];
}

function convertTreeToList(root: DrawMenuI): DrawMenuI[] {
    var stack: DrawMenuI[] = [],
        array: DrawMenuI[] = [],
        hashMap = {};
    stack.push(root);
    while (stack.length !== 0) {
        var node = stack.pop();
        if (node) {
            if (node.child && node.child.length > 0) {
                for (var i = node.child.length - 1; i >= 0; i--) {
                    stack.push(node.child[i]);
                }
            } else {
                visitNode(node, hashMap, array);
            }

            if (node.child && node.child.length > 0 && node.path_) {
                visitNode(node, hashMap, array);
            }
        }
    }

    return array;
}

function visitNode(node: DrawMenuI, hashMap: any, array: DrawMenuI[]) {
    if (!hashMap[`${node.id}`]) {
        hashMap[`${node.id}`] = true;
        array.push(node);
    }
}
