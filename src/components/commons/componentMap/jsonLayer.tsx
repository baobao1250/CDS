import locatorImg from "assets/images/locator_1.png";
import locatorImgActive from "assets/images/locator_active.png";
import { loadModules } from "esri-loader";
import React from "react";
import { Marker } from "./index";

export interface JsonLayerProps {
    view: any;
    map: any;
    arrMarker: Marker[];
    setLayer: (value: any) => void;
    formik: any;
}

const JsonLayer: React.FC<JsonLayerProps> = ({ view, map, arrMarker, setLayer, formik }) => {
    const [graphicLayers, setGraphicLayers] = React.useState<any>();
    React.useEffect(() => {
        loadModules([
            "esri/Graphic",
            "esri/layers/GraphicsLayer",
            "esri/geometry/Multipoint",
            "esri/layers/FeatureLayer",
            "esri/geometry/Point",
            "esri/widgets/Editor",
            "esri/PopupTemplate",
        ]).then(([Graphic, GraphicsLayer, PopupTemplate]) => {
            const graphicsLayer = new GraphicsLayer();
            map.add(graphicsLayer);
            setGraphicLayers(graphicsLayer);
            arrMarker.forEach((item) => {
                const pt = {
                    type: "point",
                    longitude: item.diaChiKinhDo, //check if the point is longitude and change accordingly
                    latitude: item.diaChiViDo, //check if the point is latitude and change accordingly
                };
                const px = {
                    type: "picture-marker", // autocasts as new PictureMarkerSymbol()
                    url: locatorImg,
                    width: "24px",
                    height: "35px",
                };
                const popupTemplate = {
                    title:
                        "<span style='font-weight:bold;color:" +
                        formik.values.mauSacGiaTri +
                        ";" +
                        "font-size:" +
                        formik.values.fontSizeGiaTri +
                        "px" +
                        ";'>{Name}</span>",
                    content:
                        "<span style='font-weight:bold;color:" +
                        formik.values.mauSacGiaTri +
                        ";" +
                        "font-size:" +
                        formik.values.fontSizeGiaTri +
                        "px" +
                        ";'>Số lượng: {Description}</span>",
                };

                const attributes = {
                    Name: item.diaChiDayDu,
                    Description: item.value,
                };

                const pointGraphic = new Graphic({
                    geometry: pt,
                    symbol: {
                        type: "simple-marker",
                        color: formik.values.mauSacChuThich,
                        size: formik.values.fontSizeChuThich,
                    },
                    attributes: attributes,
                    popupTemplate: popupTemplate,
                });

                if (formik.values.anChuThich == true) {
                    map.remove(pointGraphic);
                } else {
                    graphicsLayer.add(pointGraphic);
                }
            });
            if (graphicLayers) {
            }
        });
    }, [
        formik.values.anChuThich,
        formik.values.mauSacChuThich,
        formik.values.fontSizeChuThich,
        formik.values.anGiaTri,
        formik.values.fontSizeGiaTri,
        formik.values.mauSacGiaTri,
        // formik.values.anChuThich,
        arrMarker,
    ]);
    view.on("click", function (event: any) {
        view.hitTest(event).then(function (response: any) {
            const results = response.results;
            if (results.length > 0 && results[0].graphic) {
                setLayer(results[0].graphic);
            }
        });
    });
    React.useEffect(() => {
        map.removeAll();
        view.popup.autoOpenEnabled = !formik.values.anGiaTri;
        view.graphics.removeAll();
        view.popup.close();
        if (graphicLayers) {
            view.graphics.removeAll();
        }
    }, [
        formik.values.anChuThich,
        formik.values.mauSacChuThich,
        formik.values.fontSizeChuThich,
        formik.values.anGiaTri,
        formik.values.fontSizeGiaTri,
        formik.values.mauSacGiaTri,
        arrMarker,
    ]);

    React.useEffect(() => {
        if (view) {
            let pt = {
                latitude: 10.03572,
                longitude: 105.78712,
            };
            if (arrMarker.length === 0) {
                view.goTo({ geomery: pt, zoom: 12 });
            }
        }
    }, [formik]);

    return null;
};

export default JsonLayer;
