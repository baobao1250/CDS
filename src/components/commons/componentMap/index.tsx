import { Map } from "@esri/react-arcgis";
import { Grid } from "@material-ui/core";
import { Pagination } from "apis/baseService";
import { Pageable } from "components/commons/customTable/customTableInterface";
import { API_KEY_MAP } from "constants/constants";
import { loadModules } from "esri-loader";
import React, { memo, useEffect, useState } from "react";
import JsonLayer from "./jsonLayer";
import MarkerPoint from "./markerPoint";
export interface TraCuuBanDoProps {
    id: Number;
    handleSubmitSearch: (values: any, pageParams: Pageable) => Promise<Pagination<Marker[]>>;
    formik: any;
    series: any;
}

export interface Marker {
    diaChiKinhDo: number;
    diaChiViDo: number;
    diaChiDayDu: string;
    value: string;
}
let dataArrayMarker = [
    { diaChiKinhDo: 106.299291, diaChiViDo: 9.812741, diaChiDayDu: "TP Trà Vinh", value: "0" }, //
    { diaChiKinhDo: 106.2287, diaChiViDo: 9.9674, diaChiDayDu: "Huyện càng Long", value: "0" },
    { diaChiKinhDo: 106.0611, diaChiViDo: 9.8703, diaChiDayDu: "Huyện Cầu Kè", value: "0" },
    { diaChiKinhDo: 106.1963, diaChiViDo: 9.8097, diaChiDayDu: "Huyện Tiểu Cần", value: "0" },
    { diaChiKinhDo: 106.3552, diaChiViDo: 10.3048, diaChiDayDu: "Huyện Châu Thành", value: "0" },
    { diaChiKinhDo: 106.4494, diaChiViDo: 9.7919, diaChiDayDu: "Huyện Cầu Ngang", value: "0" },
    { diaChiKinhDo: 106.2758, diaChiViDo: 9.7061, diaChiDayDu: "Huyện Trà Cú", value: "0" },
    { diaChiKinhDo: 106.4877, diaChiViDo: 9.6312, diaChiDayDu: "Huyện Duyên Hải", value: "0" },
    { diaChiKinhDo: 106.5054, diaChiViDo: 9.6357, diaChiDayDu: "Thị xã Duyên Hải", value: "0" },
];

const TraCuuBanDo: React.FC<TraCuuBanDoProps> = ({ id, handleSubmitSearch, formik, series }) => {
    const [view, setView] = useState<any | null>(null);
    const [map, setMap] = useState<any | null>(null);
    const [point, setPoint] = useState<any>(null);
    const [status, setStatus] = useState<boolean>(false);
    const [layer, setLayer] = React.useState<any | null>(null);
    const [itemEdit, setItemEdit] = React.useState<Marker | null>(null);
    const [valueEdit, setValueEdit] = React.useState<Marker | null>(null);
    const [arrMarker, setArrMarker] = useState<Marker[]>([]);

    React.useEffect(() => {
        var dataArrayMap: any = [];
        if (series && series.length && series[0].type == "map") {
            for (let i = 0; i < series[0].data.length; i++) {
                for (let j = 0; j < dataArrayMarker.length; j++) {
                    if (dataArrayMarker[j].diaChiDayDu == series[0].data[i].name) {
                        dataArrayMarker[j].value = series[0].data[i].value;
                        dataArrayMap.push(dataArrayMarker[j]);
                        break;
                    }
                }
            }
            setArrMarker(dataArrayMap);
        }
    }, [series]);
    // Hook
    useEffect(() => {
        loadModules(["esri/config", "esri/Map", "esri/views/MapView"]).then(([esriConfig, Map, MapView]) => {
            esriConfig.apiKey = API_KEY_MAP;
            const map = new Map({
                id: API_KEY_MAP,
                basemap: "arcgis-topographic",
                slider: false,
            });

            const pt = {
                center: [106.3346, 9.9513],
            };

            setPoint(pt);

            const view = new MapView({
                container: "viewDiv",
                map,
                center: [106.3346, 9.9513],
                zoom: 13,
                popup: {
                    dockEnabled: true,
                    dockOptions: {
                        buttonEnabled: false,
                        breakpoint: false,
                    },
                },
            });

            setView(view);
            setMap(map);
            view.when(() => {
                setStatus(true);
            });
        });
    }, []);

    if (arrMarker.length) {
        return (
            <Grid container>
                <Grid item xs={12} style={{ maxHeight: 350 }}>
                    <Map viewProperties={{ center: [106.3346, 9.9513], zoom: 13 }} mapProperties={{ basemap: "arcgis-topographic" }}>
                        <JsonLayer view={view} map={map} arrMarker={arrMarker} setLayer={setLayer} formik={formik} />
                        <MarkerPoint view={view} itemEdit={itemEdit} />
                    </Map>
                </Grid>
            </Grid>
        );
    } else {
        return null;
    }
};

export default memo(TraCuuBanDo);
