import ApartmentIcon from "@material-ui/icons/Apartment";
import AppsIcon from "@material-ui/icons/Apps";
import BatteryStdIcon from "@material-ui/icons/BatteryStd";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import DescriptionIcon from "@material-ui/icons/Description";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import GradeIcon from "@material-ui/icons/Grade";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import MapIcon from "@material-ui/icons/Map";
import SettingsIcon from "@material-ui/icons/Settings";
import SmokingRoomsIcon from "@material-ui/icons/SmokingRooms";
import TuneIcon from "@material-ui/icons/Tune";
import HomeRounded from "@material-ui/icons/HomeRounded";
import { DanhMucDTO } from "apis/danhMuc/danhMucService";

import SearchIcon from "@material-ui/icons/Search";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import UpdateIcon from "@material-ui/icons/Update";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import MergeTypeIcon from "@material-ui/icons/MergeType";
import { MSExcelIcon, MSWordIcon, PDFIcon } from "../components/commons/icons/icons";
import { green } from "@material-ui/core/colors";
import React from "react";
import { MenuIcon } from "./icons";
import { OptionDefault } from "../components/commons/fields/createFields";
import editIcon from "assets/images/edit_icon.png";
import deleteIcon from "assets/images/delete_icon.png";

export const API_KEY_MAP = "AAPK33324f5f968a45d5a0f447b8ccc4dfc48RQTWUPnGZauFUBxgEl0_1FlFxegBPn-iPeYn2DPikYUqlJUxY8H1EmktLnhF1W7";
export const API_KEY_GOOGLE_MAP = "AIzaSyBxbiCOnQTH4MGQXtQ3mK97NJWX7YX64QQ";

export const EditIconApp = ({ height, width }: { height: number; width: number }) => <img src={editIcon} alt="edit" height={height} width={width} />;
export const DeleteIconApp = ({ height, width }: { height: number; width: number }) => <img src={deleteIcon} alt="delete" height={height} width={width} />;

export const LIST_ICONS = [
    {
        ten: "Cài đặt",
        icon: <SettingsIcon fontSize="small" />,
    },
    {
        ten: "Tệp tin",
        icon: <DescriptionIcon fontSize="small" />,
    },
    {
        ten: "Căn hộ, chung cư",
        icon: <ApartmentIcon fontSize="small" />,
    },
    {
        ten: "Thuốc lá",
        icon: <SmokingRoomsIcon fontSize="small" />,
    },
    {
        ten: "Rượu",
        icon: <LocalBarIcon fontSize="small" />,
    },
    {
        ten: "Ăn uống",
        icon: <FastfoodIcon fontSize="small" />,
    },
    {
        ten: "Chứng nhận",
        icon: <CardMembershipIcon fontSize="small" />,
    },
    {
        ten: "Ngôi sao",
        icon: <GradeIcon fontSize="small" />,
    },
    {
        ten: "Chai",
        icon: <BatteryStdIcon fontSize="small" />,
    },
    {
        ten: "Cúp",
        icon: <EmojiEventsIcon fontSize="small" />,
    },
    {
        ten: "Bản đồ",
        icon: <MapIcon fontSize="small" />,
    },
    {
        ten: "Tùy chỉnh",
        icon: <TuneIcon fontSize="small" />,
    },
    {
        ten: "Menu",
        icon: <MenuIcon />,
    },
    {
        ten: "Grid",
        icon: <AppsIcon fontSize="small" />,
    },
    {
        ten: "Home",
        icon: <HomeRounded fontSize="small" />,
    },
];
export const LIST_THANHCONGCU = [
    {
        ma: "search-icon",
        ten: "Tìm kiếm",
        icon: <SearchIcon fontSize="small" />,
    },
    {
        ma: "add-icon",
        ten: "Thêm mới",
        icon: <AddCircleOutlineIcon fontSize="small" />,
    },
    {
        ma: "update-icon",
        ten: "Cập nhật",
        icon: <UpdateIcon fontSize="small" />,
    },
    {
        ma: "delete-icon",
        ten: "Xóa",
        icon: <HighlightOffIcon fontSize="small" />,
    },
    {
        ma: "merge-icon",
        ten: "Gộp",
        icon: <MergeTypeIcon fontSize="small" />,
    },
    {
        ma: "word-icon",
        ten: "Word",
        icon: <MSWordIcon color="primary" />,
    },
    {
        ma: "excel-icon",
        ten: "Excel",
        icon: <MSExcelIcon style={{ color: green[500] }} />,
    },
    {
        ma: "pdf-icon",
        ten: "PDF",
        icon: <PDFIcon color="secondary" />,
    },
];

export const LIST_THANHCONGCU_SIZE_TOI_DA = [
    {
        ma: "search-icon",
        ten: "Tìm kiếm",
        icon: <SearchIcon fontSize="large" />,
    },
    {
        ma: "add-icon",
        ten: "Thêm mới",
        icon: <AddCircleOutlineIcon fontSize="large" />,
    },
    {
        ma: "update-icon",
        ten: "Cập nhật",
        icon: <UpdateIcon fontSize="large" />,
    },
    {
        ma: "delete-icon",
        ten: "Xóa",
        icon: <HighlightOffIcon fontSize="large" />,
    },
    {
        ma: "merge-icon",
        ten: "Gộp",
        icon: <MergeTypeIcon fontSize="large" />,
    },
    {
        ma: "word-icon",
        ten: "Word",
        icon: <MSWordIcon color="primary" fontSize="large" />,
    },
    {
        ma: "excel-icon",
        ten: "Excel",
        icon: <MSExcelIcon style={{ color: green[500] }} fontSize="large" />,
    },
    {
        ma: "pdf-icon",
        ten: "PDF",
        icon: <PDFIcon color="secondary" fontSize="large" />,
    },
];

export const LIST_FUNCTION = [
    { ma: "1", ten: "btnSearch_Click", color: "#159BD5", tenTV: "Tìm kiếm" },
    { ma: "2", ten: "btnAdd_Click", color: "rgb(95, 186, 99)", tenTV: "Thêm mới" },
    { ma: "3", ten: "btnUpdate_Click", color: "#367fa9", tenTV: "Cập nhật" },
    { ma: "4", ten: "btnDelete_Click", color: "#f50057", tenTV: "Xóa" },
    { ma: "5", ten: "btnExportWord_Click", color: "rgb(54 127 169)", tenTV: "Xuất file Word" },
    { ma: "6", ten: "btnExportExcel_Click", color: "rgb(40 138 44)", tenTV: "Xuất file Excel" },
    { ma: "7", ten: "btnExportPDF_Click", color: "rgb(241 79 2)", tenTV: "Xuất file PDF" },
    { ma: "8", ten: "btnMerge_Click", color: "#fa3535", tenTV: "Gộp" },
];

export const PhimTatChucNang = [
    { ma: "0", ten: "-- Chọn --" },
    { ma: "1", ten: "Tạo mới phản ánh kiến nghị" },
    { ma: "2", ten: "Tạo mới yêu cầu giám sát" },
    { ma: "3", ten: "Tạo mới chỉ đạo điều hành" },
    { ma: "4", ten: "Tạo mới trực quan biểu đồ" },
    { ma: "5", ten: "Tạo mới trực quan hình ảnh" },
    { ma: "6", ten: "Tạo mới trực quan video" },
    { ma: "7", ten: "Thông tin cá nhân" },
    { ma: "8", ten: "Đổi mật khẩu" },
];
export const ServiceOption = [
    { ma: "0", ten: "-- Chọn --" },
    { ma: "WEB", ten: "web" },
    { ma: "DB", ten: "db" },
    { ma: "SERVICE", ten: "service" },
];

export const LIST_METHOD = [
    { ma: "1", ten: "GET", color: "#159BD5" },
    { ma: "2", ten: "HEAD", color: "rgb(95, 186, 99)" },
    { ma: "3", ten: "POST", color: "#367fa9" },
    { ma: "4", ten: "PUT", color: "#f50057" },
    { ma: "5", ten: "PATCH", color: "rgb(54 127 169)" },
    { ma: "6", ten: "DELETE", color: "rgb(40 138 44)" },
    { ma: "7", ten: "OPTIONS", color: "rgb(241 79 2)" },
    { ma: "8", ten: "TRACE", color: "#fa3535" },
];

export const DOWNLOAD_TYPES = {
    WORD: "docx",
    EXCEL: "xlsx",
    PDF: "pdf",
};

export const ACCEPT_FILES = "image/*,.doc,.docx,.xls,.xlsx,.pdf";

export const ACCEPT_FILES_IMAGE = "image/gif, image/icon, image/jpg, image/jpeg, image/png";

export const DMDichVu: Partial<DanhMucDTO>[] = [
    { ma: "THUE", ten: "Dịch vụ thông tin Thuế phục vụ cán bộ công chức" },
    { ma: "Y_TE", ten: "Dịch vụ thông tin Y tế phục vụ người dân" },
    { ma: "GIAO_DUC", ten: "Dịch vụ thông tin Giáo dục phục vụ người dân, doanh nghiệp" },
    { ma: "NONG_NGHIEP", ten: "Dịch vụ thông tin Nông nghiệp phục vụ người dân, doanh nghiệp" },
    { ma: "TAI_NGUYEN", ten: "Dịch vụ thông tin Tài nguyên môi trường phục vụ người dân, doanh nghiệp" },
    { ma: "LAO_DONG", ten: "Dịch vụ thông tin Lao động thương binh xã hội phục vụ người dân, doanh nghiệp" },
    { ma: "GIAO_THONG", ten: "Dịch vụ thông tin Giao thông vận tải phục vụ người dân, doanh nghiệp" },
    { ma: "CONG_THUONG", ten: "Dịch vụ thông tin Công thương phục vụ người dân, doanh nghiệp" },
    { ma: "KHO_BAC", ten: "Dịch vụ thông tin Kho bạc người dân, doanh nghiệp" },
];
export const DMBieuDo: Partial<DanhMucDTO>[] = [
    { ma: "", ten: "" },
    { ma: "THUE1", ten: "Thuế phục vụ cán bộ công chức 1" },
    { ma: "THUE2", ten: "Thuế phục vụ cán bộ công chức 2" },
    { ma: "Y_TE1", ten: "Y tế phục vụ người dân 1" },
    { ma: "Y_TE1", ten: "Y tế phục vụ người dân 2" },
    { ma: "GIAO_DUC1", ten: "Giáo dục phục vụ người dân, doanh nghiệp 1" },
    { ma: "GIAO_DUC2", ten: "Giáo dục phục vụ người dân, doanh nghiệp 2" },
    { ma: "TAI_NGUYEN1", ten: "Tài nguyên môi trường phục vụ người dân, doanh nghiệp 1" },
    { ma: "THUE1", ten: "Tài nguyên môi trường phục vụ người dân, doanh nghiệp 2" },
];
export const DMTinhTrang: Partial<DanhMucDTO>[] = [
    { ma: "", ten: "-- Tất cả --" },
    { ma: "DANG_SOAN", ten: "Đang soạn" },
    { ma: "CHUA_PHAN_HOI", ten: "Chưa phản hồi" },
    { ma: "DA_PHAN_HOI", ten: "Đã phản hồi" },
    { ma: "HUY_YEU_CAU", ten: "Hủy yêu cầu" },
];

export enum CHUYEN_NGANH {
    PHAN_ANH_KIEN_NGHI = "PAKN",
    CHI_DAO_DIEU_HANH = "CDDH",
    GIAM_SAT_DU_LIEU = "GSDL",
    THONG_BAO = "TB",
    ICON = "ICON",
}
export const DMPhongBan: Partial<DanhMucDTO>[] = [
    { ma: "", ten: "-- Chọn phòng ban --" },
    { ma: "PB1", ten: "Phòng ban 1" },
    { ma: "PB2", ten: "Phòng ban 2" },
    { ma: "PB3", ten: "Phòng ban 3" },
];
export const DMNguoiNhan: Partial<DanhMucDTO>[] = [
    { ma: "", ten: "-- Chọn người nhận --" },
    { ma: "NN1", ten: "Người nhận 1" },
    { ma: "NN2", ten: "Người nhận 2" },
    { ma: "NN3", ten: "Người nhận 3" },
];
export const DMTieuChi: Partial<DanhMucDTO>[] = [
    { ma: "", ten: "" },
    { ma: "TC1", ten: "Tiêu chí 1" },
    { ma: "TC2", ten: "Tiêu chí 2" },
    { ma: "TC3", ten: "Tiêu chí 3" },
    { ma: "TC4", ten: "Tiêu chí 4" },
    { ma: "TC5", ten: "Tiêu chí 5" },
];
export const DMTHU: Partial<DanhMucDTO>[] = [
    { ma: "", ten: "Chọn thứ" },
    { ma: "MON", ten: "Thứ 2" },
    { ma: "TUE", ten: "Thứ 3" },
    { ma: "WED", ten: "Thứ 4" },
    { ma: "THU", ten: "Thứ 5" },
    { ma: "FRI", ten: "Thứ 6" },
    { ma: "SAT", ten: "Thứ 7" },
    { ma: "SUN", ten: "Chủ nhật" },
];

const yearNow = new Date().getFullYear();

export let YearOptions: Partial<DanhMucDTO>[] = [];

for (let index = yearNow; index >= yearNow - 2; index--) {
    const element = { ma: `${index - 1}`, ten: Number(index - 1) };
    YearOptions.unshift({ ...element } as unknown as Partial<DanhMucDTO>);
}

for (let index = yearNow; index <= yearNow + 3; index++) {
    const element = { ma: `${index}`, ten: index };
    YearOptions.push({ ...element } as unknown as Partial<DanhMucDTO>);
}

export const DMTHANG: Partial<DanhMucDTO>[] = [
    { ma: "", ten: "Chọn ngày trong tháng" },
    { ma: "1", ten: "Ngày 1" },
    { ma: "2", ten: "Ngày 2" },
    { ma: "3", ten: "Ngày 3" },
    { ma: "4", ten: "Ngày 4" },
    { ma: "5", ten: "Ngày 5" },
    { ma: "6", ten: "Ngày 6" },
    { ma: "7", ten: "Ngày 7" },
    { ma: "8", ten: "Ngày 8" },
    { ma: "9", ten: "Ngày 9" },
    { ma: "10", ten: "Ngày 10" },
    { ma: "11", ten: "Ngày 11" },
    { ma: "12", ten: "Ngày 12" },
    { ma: "13", ten: "Ngày 13" },
    { ma: "14", ten: "Ngày 14" },
    { ma: "15", ten: "Ngày 15" },
    { ma: "16", ten: "Ngày 16" },
    { ma: "17", ten: "Ngày 17" },
    { ma: "18", ten: "Ngày 18" },
    { ma: "19", ten: "Ngày 19" },
    { ma: "20", ten: "Ngày 20" },
    { ma: "21", ten: "Ngày 21" },
    { ma: "22", ten: "Ngày 22" },
    { ma: "23", ten: "Ngày 23" },
    { ma: "24", ten: "Ngày 24" },
    { ma: "25", ten: "Ngày 25" },
    { ma: "26", ten: "Ngày 26" },
    { ma: "27", ten: "Ngày 27" },
    { ma: "28", ten: "Ngày 28" },
    { ma: "29", ten: "Ngày 29" },
    { ma: "30", ten: "Ngày 30" },
    { ma: "31", ten: "Ngày 31" },
];
export const DMNAM: Partial<DanhMucDTO>[] = [
    { ma: "", ten: "Chọn tháng trong năm" },
    { ma: "1", ten: "Tháng 1" },
    { ma: "2", ten: "Tháng 2" },
    { ma: "3", ten: "Tháng 3" },
    { ma: "4", ten: "Tháng 4" },
    { ma: "5", ten: "Tháng 5" },
    { ma: "6", ten: "Tháng 6" },
    { ma: "7", ten: "Tháng 7" },
    { ma: "8", ten: "Tháng 8" },
    { ma: "9", ten: "Tháng 9" },
    { ma: "10", ten: "Tháng 10" },
    { ma: "11", ten: "Tháng 11" },
    { ma: "12", ten: "Tháng 12" },
];
export const DANHMUCNAM: Partial<DanhMucDTO>[] = [
    { ma: "", ten: "Chọn năm" },
    { ma: "2019", ten: "2019" },
    { ma: "2020", ten: "2020" },
    { ma: "2021", ten: "2021" },
    { ma: "2022", ten: "2022" },
    { ma: "2023", ten: "2023" },
    { ma: "2024", ten: "2024" },
    { ma: "2025", ten: "2025" },
    { ma: "2026", ten: "2026" },
    { ma: "2027", ten: "2027" },
    { ma: "2028", ten: "2028" },
    { ma: "2029", ten: "2029" },
    { ma: "2030", ten: "2030" },
];
export const DMTHONGBAO: Partial<OptionDefault>[] = [
    { value: "code", title: "Mã" },
    { value: "content", title: "Nội dung thông báo" },
    { value: "level", title: "Mức độ" },
];
export const SIZETHONGBAO: Partial<OptionDefault>[] = [
    { value: "sm", title: "Nhỏ" },
    { value: "md", title: "Trung bình" },
    { value: "lg", title: "Lớn" },
];
export const DM_UC_FINAL: Partial<OptionDefault>[] = [
    { value: "XLHTDL_102_148", title: "C12_102_C13_148" },
    { value: "XLHTDL_107_154", title: "C12_107_C13_154" },
    { value: "XLHTDL_127", title: "C13_127" },
    { value: "XLHTDL_264", title: "C14_264" },
    { value: "XLHTDL_269", title: "C14_269" },
    { value: "XLHTDL_308", title: "C15_308" },
    { value: "XLHTDL_314", title: "C15_314" },
    { value: "XLHTDL_380", title: "M16_380" },
    { value: "XLHTDL_392", title: "M16_392" },
];

export const DM_UC_DIALOG = {
    C12_102_C13_148: "XLHTDL_102_148",
    C12_107_C13_154: "XLHTDL_107_154",
    XLHTDL_127: "XLHTDL_127",
    XLHTDL_264: "XLHTDL_264",
    XLHTDL_269: "XLHTDL_269",
    XLHTDL_308: "XLHTDL_308",
    XLHTDL_314: "XLHTDL_314",
    XLHTDL_380: "XLHTDL_380",
    XLHTDL_392: "XLHTDL_392",
};

export const DM_UC_LEVEL = {
    INFO: "Thông tin",
    WARN: "Cảnh báo",
    ERROR: "Lỗi",
};

export const DMLOAIBIEUDO = [
    { ma: "0", ten: "-- Chọn --" },
    { ma: "1", ten: "Biểu đồ cột" },
    { ma: "2", ten: "Biểu đồ đường" },
    { ma: "3", ten: "Biểu đồ thanh" },
    { ma: "4", ten: "Biểu đồ tròn" },
    { ma: "5", ten: "Biểu đồ vùng" },
    { ma: "6", ten: "Biểu đồ bong bóng và tán xạ" },
    { ma: "7", ten: "Biểu đồ radar" },
    { ma: "8", ten: "Biểu đồ kết hợp" },
    { ma: "9", ten: "Biểu đồ bề mặt" },
    { ma: "10", ten: "Biểu đồ khác" },
];

export const DM_BIEU_DO = [
    { id: "0", ma: "", ten: "-- Chọn --" },
    { id: "1", ma: "bar", ten: "Biểu đồ cột liên cụm" },
    { id: "1", ma: "bar-stack", ten: "Biểu đồ cột xếp chồng" },
    { id: "1", ma: "bar-stack-100", ten: "Biểu đồ cột xếp chồng 100%" },
    { id: "1", ma: "bar-3d-under", ten: "Biểu đồ cột liên cụm 3D" },
    { id: "1", ma: "bar-stack-3d", ten: "Biểu đồ cột xếp chồng 3D" },
    { id: "1", ma: "bar-stack-3d-100", ten: "Biểu đồ cột xếp chồng 100% 3D" },
    { id: "1", ma: "bar-3d-column", ten: "Biểu đồ cột 3D" },
    { id: "1", ma: "bar-options", ten: "Biểu đồ cột nhiều chiều trên cơ sở biểu đồ 2D" },
    { id: "2", ma: "line", ten: "Biểu đồ đường" },
    { id: "2", ma: "line-maker", ten: "Biểu đồ đường có đánh dấu" },
    { id: "2", ma: "line-stack", ten: "Biểu đồ đường xếp chồng" },
    { id: "2", ma: "line-stack-100", ten: "Biểu đồ đường xếp chồng 100%" },
    { id: "2", ma: "line-3D", ten: "Biểu đồ đường 3D" },
    { id: "2", ma: "line-options", ten: "Biểu đồ đường nhiều chiều trên cơ sở biểu đồ 2D" },
    { id: "3", ma: "clusterd-bar", ten: "Biểu đồ thanh liên cụm" },
    { id: "3", ma: "stacked-bar", ten: "Biểu đồ thanh xếp chồng" },
    { id: "3", ma: "stacked-bar-100", ten: "Biểu đồ thanh xếp chồng 100%" },
    { id: "3", ma: "clusterd-bar-3d", ten: "Biểu đồ thanh liên cụm 3D" },
    { id: "3", ma: "stack-bar-3d", ten: "Biểu đồ thanh xếp chồng 3D" },
    { id: "3", ma: "stack-bar-3d-100", ten: "Biểu đồ thanh xếp chồng 100% 3D" },
    { id: "3", ma: "stacked-bar-100-options", ten: "Biểu đồ thanh xếp chồng 100% nhiều chiều" },
    { id: "4", ma: "pie", ten: "Biểu đồ đường tròn" },
    { id: "4", ma: "pie-3D", ten: "Biểu đồ đường tròn 3D" },
    { id: "4", ma: "pie-options", ten: "Biểu đồ đường tròn nhiều chiều" },
    { id: "4", ma: "pie-doughnut", ten: "Biểu đồ vành khuyên bị cắt" },
    { id: "4", ma: "pie-of-pie", ten: "Biểu đồ hình tròn của hình tròn" },
    { id: "4", ma: "bar-of-pie", ten: "Biểu đồ thanh của hình tròn" },
    { id: "5", ma: "area", ten: "Biểu đồ vùng" },
    { id: "5", ma: "area-stack", ten: "Biểu đồ vùng xếp chồng" },
    { id: "5", ma: "area-stack-100", ten: "Biểu đồ vùng xếp chồng 100%" },
    { id: "5", ma: "area-options", ten: "Biểu đồ vùng nhiều chiều" },
    { id: "5", ma: "area-3D", ten: "Biểu đồ vùng 3D" },
    { id: "5", ma: "area-stack-3D", ten: "Biểu đồ vùng xếp chồng 3D" },
    { id: "5", ma: "area-stack-100-3D", ten: "Biểu đồ vùng xếp chồng 100% 3D" },
    { id: "6", ma: "scatter", ten: "Biểu đồ tán xạ" },
    { id: "6", ma: "scatter-smooth-line", ten: "Biểu đồ tán xạ với các đường trơn" },
    { id: "6", ma: "scatter-smooth-line-maker", ten: "Biểu đồ tán xạ với các đường trơn đánh dấu" },
    { id: "6", ma: "scatter-straight-line-maker", ten: "Biểu đồ tán xạ với các đường thẳng và đánh dấu" },
    { id: "6", ma: "scatter-straight-line", ten: "Biểu đồ tán xạ với các đường thẳng" },
    { id: "6", ma: "bubble", ten: "Biểu đồ bong bóng" },
    { id: "6", ma: "bubble-3D", ten: "Biểu đồ bong bóng 3D" },
    { id: "7", ma: "radar", ten: "Biểu đồ radar" },
    { id: "7", ma: "radar-maker", ten: "Biểu đồ radar có đánh dấu" },
    { id: "7", ma: "radar-fill", ten: "Biểu đồ radar được tô" },
    { id: "8", ma: "clustered-column-line", ten: "Biểu đồ đường cột liên cụm" },
    { id: "8", ma: "clustered-column-line-secondary-axis", ten: "Biểu đồ đường cột liên cụm trên trục phụ" },
    { id: "8", ma: "stack-area-clustered-column", ten: "Biểu đồ vùng xếp chồng và cột liên cụm" },
    { id: "8", ma: "combo-custom", ten: "Biểu đồ kết hợp tùy chỉnh" },
    { id: "9", ma: "surface-3D", ten: "Biểu đồ bề mặt 3D" },
    { id: "9", ma: "surface-wireframe-3D", ten: "Biểu đồ Mặt phẳng 3D khung dây" },
    { id: "9", ma: "contour-wireframe", ten: "Biểu đồ đường viền" },
    { id: "9", ma: "contour", ten: "Biểu đồ đường cong" },
    { id: "10", ma: "treemap", ten: "Biểu đồ cây (treemap)" },
    { id: "10", ma: "sunburst", ten: "Biểu đồ sunburst" },
    { id: "10", ma: "histogram", ten: "Biểu đồ tần suất" },
    { id: "10", ma: "waterfall", ten: "Biểu đồ thác nước" },
    { id: "10", ma: "funnel", ten: "Biểu đồ hình phễu" },
    { id: "10", ma: "map", ten: "Biểu đồ bản đồ" },
];

export const optionsSize = [
    { title: "10", value: 10 },
    { title: "11", value: 11 },
    { title: "12", value: 12 },
    { title: "13", value: 13 },
    { title: "14", value: 14 },
    { title: "15", value: 15 },
    { title: "16", value: 16 },
    { title: "17", value: 17 },
    { title: "18", value: 18 },
    { title: "19", value: 19 },
    { title: "20", value: 20 },
];

export const TYPE_OBJECT = [
    { title: "Nhóm và Cơ sở dữ liệu", value: "ALL" },
    { title: "Nhóm", value: "FOLDER" },
    { title: "Cơ sở dữ liệu", value: "DATABASE" },
    { title: "Bảng", value: "TABLE" },
];

export const DMTHANGHANDWARE: Partial<any>[] = [
    { value: "", title: "Chọn tháng" },
    { value: "1", title: "Tháng 1" },
    { value: "2", title: "Tháng 2" },
    { value: "3", title: "Tháng 3" },
    { value: "4", title: "Tháng 4" },
    { value: "5", title: "Tháng 5" },
    { value: "6", title: "Tháng 6" },
    { value: "7", title: "Tháng 7" },
    { value: "8", title: "Tháng 8" },
    { value: "9", title: "Tháng 9" },
    { value: "10", title: "Tháng 10" },
    { value: "11", title: "Tháng 11" },
    { value: "12", title: "Tháng 12" },
];

export const DMNAMHANDWARE: Partial<any>[] = [
    { value: "", title: "Chọn năm" },
    { value: "2019", title: "2019" },
    { value: "2020", title: "2020" },
    { value: "2021", title: "2021" },
    { value: "2022", title: "2022" },
    { value: "2023", title: "2023" },
    { value: "2024", title: "2024" },
    { value: "2025", title: "2025" },
    { value: "2026", title: "2026" },
    { value: "2027", title: "2027" },
    { value: "2028", title: "2028" },
    { value: "2029", title: "2029" },
    { value: "2030", title: "2030" },
];

export const Type = [
    { title: "", value: "-- Chọn --" },
    { title: "text", value: "TEXT", valueDefault: "" },
    { title: "numeric", value: "NUMERIC", valueDefault: 0 },
    { title: "timestamp", value: "TIMESTAMP", valueDefault: null },
    { title: "boolean", value: "BOOLEAN", valueDefault: false },
];

export const SOURCE_MODE = [
    { title: "incrementing", value: "incrementing" },
    { title: "timestamp", value: "timestamp" },
    { title: "timestamp+incrementing", value: "timestamp+incrementing" },
];

export const PRIORITY_MODE = [
    { title: "High", value: "HIGH" },
    { title: "Medium", value: "MEDIUM" },
    { title: "Low", value: "LOW" },
];

export const DATABASE_TYPE = [
    { title: "Postgre", value: "Postgre" },
    { title: "Mongodb", value: "Mongodb" },
];

export const INSERT_MODE = [
    { title: "insert", value: "insert" },
    { title: "update", value: "update" },
    { title: "upsert", value: "upsert" },
];

export const TYPE_CA_NHAN_HOA = [
    // { title: "", value: "LOG" },
    { title: "Cấu hình thông báo", value: "THONG_BAO" },
    { title: "Thanh công cụ (tool)", value: "THANH_CONG_CU" },
    { title: "Cấu hình trực quan biểu đồ", value: "TRUC_QUAN_DL_BIEU_DO" },
    { title: "Thanh thực đơn (menu)", value: "MENU" },
    { title: "Cấu hình giao diện", value: "LAYOUT" },
    { title: "Dashboard", value: "DASHBOARD" },
    { title: "Cấu hình dashboard public", value: "DASHBOARD_PUBLIC" },
    { title: "Cấu hình dịch vụ", value: "DM_DICH_VU" },
    { title: "Cấu hình task dịch vụ", value: "TASK_DICH_VU" },
    { title: "Cấu hình danh sách dịch vụ lưu trữ dữ liệu", value: "TASK_DICH_VU_M16" },
    { title: "Cấu hình properties task dịch vụ", value: "TASK_DICH_VU_PROPERTIES" },
    { title: "Cấu hình danh sách dịch vụ cung cấp dữ liệu", value: "DM_DICH_VU_C15" },
    { title: "Cấu hình properties dịch vụ cung cấp dữ liệu", value: "DM_DICH_VU_C15_PROPERTIES" },
    { title: "Cấu hình thuộc tính", value: "THUOC_TINH" },
    { title: "Cấu hình Mô Phỏng Dự Báo", value: "TASK_MO_PHONG_C14" },
    { title: "Cấu hình View Model Dự Báo", value: "TASK_VIEW_MODEL_C14" },
    { title: "Cấu hình view model", value: "VIEW_MODAL_FLOW" },
    { title: "Cấu hình quản lý task khai phá dữ liệu", value: "TASK_KPDL_C13" },
    { title: "Cấu hình workspace", value: "WORKSPACE" },
    { title: "Cấu hình properties phân vùng dữ liệu", value: "PHAN_VUNG_DU_LIEU" },
    // { title: "", value: "PHAN_VUNG_DU_LIEU_NHOM" },
    // { title: "", value: "PHAN_VUNG_DU_LIEU_BANG" },
    // { title: "", value: "PHAN_VUNG_DU_LIEU_DATABASE" },
    { title: "Cấu hình properties dịch vụ - Input", value: "TASK_XU_LY_DU_LIEU" },
    { title: "Cấu hình danh sách segment", value: "SEGMENT" },
    { title: "Cấu hình danh sách model", value: "MODEL" },
    { title: "Cấu hình properties task xử lý dữ liệu - Tên bước, mô tả", value: "TASK_XU_LY_DU_LIEU_TEN_BUOC_MO_TA" },
    { title: "Cấu hình view model M16", value: "VIEW_MODEL_M16" },
    { title: "Cấu hình properties view model M16", value: "VIEW_MODEL_PROPERTIES_M16" },
    { title: "Cấu hình properties dịch vụ thông tin sử dụng", value: "PROPERTIES_DV_THONG_TIN_SU_DUNG" },
];

export const TYPE_BAO_CAO_THONG_KE = [
    { title: "Báo cáo thống kê hiệu năng", value: "BAO_CAO_THONG_KE_HIEU_NANG" },
    { title: "Báo cáo thống kê sử dụng", value: "BAO_CAO_THONG_KE_SU_DUNG" },
];

export const DMMUCDO: OptionDefault[] = [
    { title: "Khẩn", value: "EMERGENCY" },
    { title: "Nghiêm trọng", value: "IMPORTANT" },
    { title: "Bình thường", value: "NORMAL" },
];

export const DMLOAITHONGBAO: OptionDefault[] = [
    /*{ title: "Công chức", value: "OFFICER" },*/
    { title: "Tất cả", value: "CITIZEN" },
];

export const DMLOAIPHATHANH: OptionDefault[] = [
    { title: "Ứng dụng Smart", value: "NOTIFY" },
    { title: "SMS", value: "SMS" },
    { title: "MAIL", value: "MAIL" },
];

export const DMLOAILINHVUC: OptionDefault[] = [
    { title: "Phản ánh kiến nghị", value: "1" },
    { title: "Thủ tục hành chính", value: "2" },
];

export const DMLOAIUSER: OptionDefault[] = [
    { title: "Công dân", value: "CONG_DAN" },
];

export const DSPhanHe = [
    {
        code: "TrucQuanDuLieu",
        name: "Trực quan dữ liệu",
    },
    {
        code: "GiamSatDichVuVaDuLieu",
        name: "Giám sát dịch vụ và dữ liệu",
    },
    {
        code: "ChiDaoDieuHanh",
        name: "Chỉ đạo điều hành",
    },
    {
        code: "PhanAnhKienNghi",
        name: "Phản ánh kiến nghị",
    },
    {
        code: "ThongKeKTXHC24",
        name: "Thống kê KTXH C24",
    },
    {
        code: "QuanTriHeThong",
        name: "Quản trị hệ thống",
    },
    {
        code: "QuanTriDanhMuc",
        name: "Quản trị danh mục",
    },
    {
        code: "FileManagement",
        name: "Quản trị file",
    },
    {
        code: "LogManagement",
        name: "Quản trị log",
    },
    {
        code: "PublicAPI",
        name: "Public API",
    },
    {
        code: "PhanHeC12",
        name: "Xử lý dữ liệu từ Kho dữ liệu (C12)",
    },
    {
        code: "PhanHeC13",
        name: "Khai phá dữ liệu (C13)",
    },
    {
        code: "PhanHeC14",
        name: "Mô phỏng, dự báo dữ liệu theo mô hình (C14)",
    },
    {
        code: "PhanHeC15",
        name: "Dịch vụ cung cấp dữ liệu (C15)",
    },
    {
        code: "PhanHeM16",
        name: "Lưu trữ dữ liệu đã xử lý (M16)",
    },
    {
        code: "PhanHeTransferData",
        name: "Phân hệ chuyển đổi dữ liệu",
    },
];
