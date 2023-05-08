import React from "react";
import PolicyDocument from "../assets/meal1.jpg";

export interface Series {
  name: string;
  data: number[] | unknown[];
  type: string;
}

export interface DataChartPie {
  value: number;
  name: string;
}

export interface ChartThongTinChung {
  title: string;
  key: string;
  icon?: any;
  bgColor: string;
  counter: number;
}

export interface ListDataGroup {
  listDataGroup: ChartThongTinChung[];
}

export const myListDataGroup: ChartThongTinChung[] = [
  {
    title: "TỔNG SỐ VĂN BẢN",
    key: "TONG",
    bgColor: "#03118A",
    counter: 0,
  },
  {
    title: "TRIỂN KHAI VĂN BẢN TW",
    key: "TRUNG_UONG",
    bgColor: "#3D79BD",
    counter: 0,
  },
  {
    title: "VĂN BẢN CỦA TỈNH",
    key: "TINH_UY",
    // icon: <img className="" src={PolicyDocument} />,
    bgColor: "#3795FF",
    counter: 0,
  },
  {
    title: "VĂN BẢN CỦA HUYỆN",
    key: "HUYEN",
    bgColor: "#00B5B5",
    counter: 0,
  },
];
export const initChartThongTinChung: ChartThongTinChung = {
  title: "",
  key: "",
  icon: "",
  bgColor: "",
  counter: 0,
};
export type IContextDashBoard = {
  listData: ChartThongTinChung[];
  currentYear: string;
  handldeChangeCurrentYear: (value: any) => void;
  seriesBar: Series[];
  labelYAxis: string[];
  seriesBar2: Series[];
  labelYAxis2: string[];
  yearChartOne: string;
  setYearChartOne: any;
  yearChartTwo: string;
  setYearChartTwo: any;
  yearOfTheoDoi: string;
  setYearOfTheoDoi: any;
  dataPieAllCap: DataChartPie[];
  dataPieCapTinh: DataChartPie[];
  dataPieCapHuyen: DataChartPie[];
  totalAllCap: number;
  totalCapTinh: number;
  totalCapHuyen: number;
};
export const DashBoardContext = React.createContext<IContextDashBoard>({
  listData: [],
  currentYear: String(new Date().getFullYear()),
  yearChartOne: String(new Date().getFullYear()),
  setYearChartOne: null,
  yearChartTwo: String(new Date().getFullYear()),
  setYearChartTwo: null,
  yearOfTheoDoi: String(new Date().getFullYear()),
  setYearOfTheoDoi: null,
  handldeChangeCurrentYear: () => {},
  seriesBar: [],
  labelYAxis: [],
  seriesBar2: [],
  labelYAxis2: [],
  dataPieAllCap: [],
  dataPieCapTinh: [],
  dataPieCapHuyen: [],
  totalAllCap: 0,
  totalCapTinh: 0,
  totalCapHuyen: 0,
});
