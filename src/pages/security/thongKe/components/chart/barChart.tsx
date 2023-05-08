import React from "react";
import ReactEChartsCore from "echarts-for-react";

export interface BarChartProps {
   
}
const BarChart: React.FC<BarChartProps> = ({}) => {
    // get context
    return (
        <>
           
                <ReactEChartsCore
                    style={{
                        height: "100%",
                        width: "100%",
                    }}
                    option={{
                        tooltip: {},
                        grid: {
                            left: "5%",
                            right: "5%",
                            bottom: "10%",
                            containLabel: true,
                        },
                        xAxis: {
                            type: "value",
                            boundaryGap: [0, 0.01],
                            // boundaryGap: true,
                        },
                        yAxis: {
                            type: "category",
                            data: labelYAxis,
                            axisLabel: {
                                color: "black",
                                fontSize: 11,
                                fontFamily: "sans-serif",
                                hideOverlap: false,
                                width: 10,
                                overflow: "break",
                            },
                            axisTick: {
                                alignWithLabel: true,
                                show: false,
                            },
                        },
                        // series: series,
                        series: seriesBar,
                        color: ["#5B9BD5", "#00B050", "#FF0000"],
                    }}
                />
        </>
    );
};

export default BarChart;
