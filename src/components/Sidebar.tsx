import { FC, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from "react-pro-sidebar";
import {
    MenuOutlined,
    HomeOutlined,
    InfoOutlined,
    RestaurantMenuOutlined,
    SecurityOutlined,
    FoodBankOutlined,
    SearchOutlined,
    RecommendOutlined,
    Settings,
} from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import { SidebarFooter } from "./SidebarFooter";
import { Badge } from "./Badge";
import { useSidebar, useSidebarSelectedMenuTitleContext, useTemplateThemeModeContext } from "../hooks";
import { TemplateThemeModeContextType } from "../context";

const SideBar: FC = (): ReactElement => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { collapsed } = useProSidebar();
    const { toggle, menuItemStyles } = useSidebar();
    const { setMenuTitle } = useSidebarSelectedMenuTitleContext();
    const { isDark } = useTemplateThemeModeContext() as TemplateThemeModeContextType;

    const menuItemMouseUpHandler = (mnuTitle: string) => {
        setMenuTitle(mnuTitle);
    };
    return (
        <Sidebar
            rtl={false}
            breakPoint="sm"
            transitionDuration={800}
            style={{ height: "100vh" }}
            backgroundColor={isDark ? theme.palette.primary.dark : theme.palette.primary.light}
            rootStyles={{
                color: isDark ? theme.palette.secondary.dark : theme.palette.secondary.light,
                // color: color, isDark ? theme.palette.success.dark : theme.palette.success.light
            }}
        >
            <Menu>
                <MenuItem
                    id="sidebarMnuHeader"
                    style={{
                        textAlign: "center",
                        height: 68,
                        marginTop: 0,
                        backgroundColor: isDark ? theme.palette.info.dark : theme.palette.info.light,
                    }}
                    icon={<MenuOutlined sx={{ color: isDark ? theme.palette.success.dark : theme.palette.success.light }} />}
                    onClick={() => {
                        toggle();
                    }}
                >
                    {" "}
                    <Typography
                        sx={{
                            textAlign: "center",
                            fontWeight: "bold",
                            my: "1rem",
                            color: isDark ? theme.palette.success.dark : theme.palette.success.light,
                        }}
                        variant="h5"
                    >
                        QUYTUTHIEN
                    </Typography>
                </MenuItem>
            </Menu>
            {/* <div style={{ flex: 1, marginBottom: '32px' }}> style={{ marginBottom: '24px', marginTop: '16px' }}*/}
            {/* component="Link" href="/" */}
            <Box sx={{ p: "0 24px", mb: "8px", mt: "8px" }}>
                <Typography variant="body2" fontWeight={600} style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: "0.5px" }}>
                    Web Site
                </Typography>
            </Box>
            <Menu menuItemStyles={menuItemStyles}>
                <MenuItem
                    icon={<HomeOutlined />}
                    onClick={() => navigate("/", { replace: true })}
                    onMouseUp={() => menuItemMouseUpHandler("Home")}
                >
                    Home
                </MenuItem>
                <SubMenu icon={<InfoOutlined />} label="Thông tin chung">
                    <MenuItem
                        onClick={() => navigate("baseinfo/company", { replace: true })}
                        onMouseUp={() => menuItemMouseUpHandler("Profile")}
                    >
                        Profile
                    </MenuItem>
                    <MenuItem
                        onClick={() => navigate("baseinfo/department", { replace: true })}
                        onMouseUp={() => menuItemMouseUpHandler("Logout")}
                    >
                        Logout
                    </MenuItem>
                    <MenuItem
                        onClick={() => navigate("baseinfo/employee", { replace: true })}
                        onMouseUp={() => menuItemMouseUpHandler("Login")}
                    >
                        Login
                    </MenuItem>
                </SubMenu>
                <SubMenu icon={<RestaurantMenuOutlined />} label="Danh sách quỷ">
                    <MenuItem
                        onClick={() => navigate("restaurant/meal", { replace: true })}
                        onMouseUp={() => menuItemMouseUpHandler("Danh sách quỷ tỉnh")}
                    >
                        Danh sách quỷ tỉnh
                    </MenuItem>
                    <MenuItem
                        onClick={() => navigate("restaurant/mealssettingmonthly", { replace: true })}
                        onMouseUp={() => menuItemMouseUpHandler("Danh sách quỷ huyện")}
                    >
                        Danh sách quỷ huyện
                    </MenuItem>
                    <MenuItem
                        onClick={() => navigate("restaurant/mealsselectioncurrentmonth", { replace: true })}
                        onMouseUp={() => menuItemMouseUpHandler("Danh sách quỷ phường")}
                    >
                        Danh sách quỷ phường
                    </MenuItem>
                </SubMenu>

                <SubMenu icon={<InfoOutlined />} label="Nghĩa vụ quân sự">
                    <MenuItem
                        onClick={() => navigate("danhmuc/QuanLyDangKyNVQS", { replace: true })}
                        onMouseUp={() => menuItemMouseUpHandler("Đăng ký nghĩa vụ quân sự")}
                    >
                        Đăng ký nghĩa vụ quân sự
                    </MenuItem>
                </SubMenu>

                <Box sx={{ py: "0", px: "24px", mb: "8px", mt: "32px" }}>
                    <Typography variant="body2" fontWeight={600} style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: "0.5px" }}>
                        Admin
                    </Typography>
                </Box>

                <Menu menuItemStyles={menuItemStyles}>
                    {/* <MenuItem icon={<FoodBankOutlined />} suffix={<Badge variant="success">New</Badge>}>
                New Courses
              </MenuItem> */}

                    <MenuItem
                        icon={<HomeOutlined />}
                        onClick={() => navigate("security/ThongKe", { replace: true })}
                        onMouseUp={() => menuItemMouseUpHandler("ThongKe")}
                    >
                        Thông kê
                    </MenuItem>

                    <SubMenu icon={<SecurityOutlined />} label="Danh mục">
                        <MenuItem
                            onClick={() => navigate("danhmuc/danhmuctinh", { replace: true })}
                            onMouseUp={() => menuItemMouseUpHandler("Danh mục tỉnh")}
                        >
                            Danh mục tỉnh
                        </MenuItem>
                        <MenuItem
                            onClick={() => navigate("security/group", { replace: true })}
                            onMouseUp={() => menuItemMouseUpHandler("Danh mục huyện")}
                        >
                            Danh mục huyện
                        </MenuItem>
                        <MenuItem
                            onClick={() => navigate("security/permission", { replace: true })}
                            onMouseUp={() => menuItemMouseUpHandler("Danh mục phường")}
                        >
                            Danh mục phường
                        </MenuItem>
                    </SubMenu>

                    <SubMenu icon={<SearchOutlined />} label="Danh sách nộp quỷ">
                        <MenuItem
                            onClick={() => navigate("danhsach/danhsachcanhan", { replace: true })}
                            onMouseUp={() => menuItemMouseUpHandler("Cá nhân")}
                        >
                            Cá nhân
                        </MenuItem>
                        <MenuItem
                            onClick={() => navigate("security/grouppermission", { replace: true })}
                            onMouseUp={() => menuItemMouseUpHandler("Hộ gia đình")}
                        >
                            Hộ gia đình
                        </MenuItem>
                    </SubMenu>
                    {/* <MenuItem disabled icon={<RecommendOutlined />}>
                Examples
              </MenuItem> */}
                </Menu>
                {/* <MenuItem 
              icon={<Settings/>}
              onClick={() => navigate('/config', { replace: true })}
              onMouseUp={() => menuItemMouseUpHandler('Template Configuration')}
            >
              Template Config
            </MenuItem> */}
            </Menu>
            {/* <SidebarFooter collapsed={collapsed}/> */}
        </Sidebar>
    );
};

export default SideBar;
