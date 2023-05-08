import { loadModules } from "esri-loader";
import React, { useEffect } from "react";
import { Marker } from "./index";

export interface MarkerPointProps {
    view: any;
    itemEdit: Marker | null;
}

const MarkerPoint: React.FC<MarkerPointProps> = ({ itemEdit, view }) => {
    const [viewMap, setViewMap] = React.useState<any>();

    React.useEffect(() => {
        setViewMap(view);
    }, [view]);

    useEffect(() => {
        loadModules(["esri/geometry/Point"]).then(([Point]) => {
            if (viewMap && itemEdit?.diaChiKinhDo && itemEdit.diaChiViDo) {
                let pt = new Point({
                    latitude: itemEdit.diaChiViDo,
                    longitude: itemEdit.diaChiKinhDo,
                });
                viewMap.goTo({ geometry: pt, zoom: 17 });
                viewMap.popup.open({
                    title: +Math.round(pt.longitude * 100000) / 100000 + ", " + Math.round(pt.latitude * 100000) / 100000,
                    content: itemEdit.diaChiDayDu,
                    location: pt,
                });
            }
        });
    }, [viewMap, itemEdit?.diaChiKinhDo, itemEdit?.diaChiViDo]);

    return null;
};

export default MarkerPoint;
