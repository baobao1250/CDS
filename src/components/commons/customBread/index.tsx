import { Box, Breadcrumbs, Link } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { RootState } from "apis/redux/reducers/rootReducer";
import { MenuRoleItem } from "models/menu";
import React from "react";
import { useSelector } from "react-redux";
import ButtonScreen from "../fullScreenButton";
export interface CustomBreadProps {
    isHasButtonSc?: boolean;
}

const CustomBread: React.FC<CustomBreadProps> = ({ isHasButtonSc = true }) => {
    const { menuSelectNavBar }: any = useSelector((state: RootState) => {
        if ("menuReducer" in state) {
            return state["menuReducer"];
        }
    });

    function renderItem(menu: MenuRoleItem, path: string) {
        if (menu.childrens && menu.childrens.length > 0) {
            return menu.childrens.map((item, index) => {
                if (item.url === path) {
                    const length = item.childrens && item.childrens.length;
                    return (
                        <Link
                            key={item.id}
                            color="inherit"
                            href={item.url}
                            aria-current="page"
                            style={{
                                fontWeight: 500,
                                fontSize: 13,
                                color: "#AAA",
                                cursor: "pointer",
                                textDecoration: "none",
                            }}
                        >
                            {item.name}
                        </Link>
                    );
                } else {
                    renderItem(item, path);
                }
            });
        }
    }

    const length = menuSelectNavBar && menuSelectNavBar.childrens.length;

    return (
        <Box
            component="div"
            borderBottom={"1px solid #AAA"}
            display="flex"
            justifyContent="space-between"
            paddingBottom="14px"
            paddingTop="17px"
            marginRight="10px"
            marginLeft="10px"
        >
            <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" style={{ color: "#C0B9C7" }} />}>
                {menuSelectNavBar && (
                    <Link underline="hover" color="inherit" style={{ fontWeight: 400, fontSize: 13, color: "#000" }}>
                        {menuSelectNavBar.name}
                    </Link>
                )}
                {menuSelectNavBar &&
                    menuSelectNavBar.childrens &&
                    menuSelectNavBar.childrens.length > 0 &&
                    renderItem(menuSelectNavBar, "/" + window.location.href.split("/").slice(3).join("/"))}
            </Breadcrumbs>
            {isHasButtonSc && <ButtonScreen />}
        </Box>
    );
};

export default CustomBread;
