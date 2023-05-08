import ReactEChartsCore from "echarts-for-react";
import React from "react";
import { DataChartPie } from "../../../../../models/thongKeinterface";

export interface PieChartProps {
    total: number;
}

const PieChart: React.FC<PieChartProps> = ({  total }) => {
    const data: DataChartPie[] = [
        { value: 73, name: "Chưa thực hiện" },
        { value: 58, name: "Đã hoàn thành" },
    ];

    return (
        <ReactEChartsCore
            option={{
                title: {
                    text: `Tổng đơn vị thực hiện: ${total}`,
                    left: "50%",
                    top: "20%",
                    textStyle: {
                        fontSize: 13,
                        fontFamily: "Inter",
                    },
                },
                tooltip: {
                    trigger: "item",
                    textStyle: {
                        fontFamily: "Inter",
                        // color: "white",
                    },
                    formatter: "{b}: {c} ({d}%)", // name: value (%)
                    // backgroundColor: "rgba(54,64,99,0.7)",
                },
                legend: {
                    title: "ssss",
                    show: true,
                    bottom: "0%",
                    top: "35%",
                    right: "10%",
                    orient: "vertical",
                    // textStyle: {
                    //     color: "#828282",
                    // },
                    formatter: function (name: any) {
                        var value = data && data.filter((row) => row.name === name)[0].value;
                        return name + ": " + value;
                    },
                },
                series: [
                    {
                        type: "pie",
                        radius: "50%",
                        center: ["30%", "40%"],
                        // avoidLabelOverlap: false,
                        label: {
                            show: true,
                            // formatter: '{d}%',
                            position: "inside",
                            color: "#ffffff",
                            formatter: (param: any) => {
                                var percent = param.percent;
                                return !percent ? "" : percent + "%";
                            },
                        },
                        itemStyle: {
                            borderRadius: 3,
                            borderColor: "#fff",
                            borderWidth: 2,
                        },
                        color: 'red',
                        data: data,
                    },
                ],
            }}
        />
    );
};

export default PieChart;
