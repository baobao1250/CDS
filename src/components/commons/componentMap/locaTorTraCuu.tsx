import locatorImg from "assets/images/locator_1.png";
import { loadModules } from "esri-loader";
import React, { useEffect, useState } from "react";
import { Marker } from "./index";
export interface LocatorTraCuuProps {
    view: any;
    layer?: any;
    itemEdit?: Marker | null;
    setValueEdit: (value: Marker | null) => void;
}

const LocatorTraCuu: React.FC<LocatorTraCuuProps> = ({ view, setValueEdit, itemEdit }) => {
    const [locator, setLocator] = useState<any>(null);
    const [isEdit, setIsEdit] = React.useState<boolean>(false);
    const [mouseEvent, setMouseEvent] = React.useState<any>();

    React.useEffect(() => {
        if (itemEdit) {
            setIsEdit(true);
        } else {
            setIsEdit(false);
        }
    }, [itemEdit]);

    useEffect(() => {
        loadModules(["esri/tasks/Locator"])
            .then(([Locator]) => {
                const locatorTask = new Locator({
                    url: "http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer",
                });
                setLocator(locatorTask);
            })

            .catch((err) => console.error(err));

        return function cleanup() {};
    }, []);

    useEffect(() => {
        loadModules(["esri/Graphic"]).then(([Graphic]) => {
            setMouseEvent(
                view.on("click", function (evt: { mapPoint: { longitude: number; latitude: number } }) {
                    if (isEdit) {
                        const locationGraphic = createGraphic(evt.mapPoint);
                        view.graphics.add(locationGraphic, 0);
                        clickPoint(evt);
                    }
                })
            );
            if (!isEdit) {
                if (mouseEvent) {
                    mouseEvent.remove();
                    setMouseEvent(undefined);
                }
            }
            function createGraphic(point: any) {
                view.graphics.removeAll();
                let symbol = {
                    type: "picture-marker", // autocasts as new PictureMarkerSymbol()
                    url: locatorImg,
                    width: "24px",
                    height: "35px",
                };
                const graphic = new Graphic({
                    geometry: point,
                    symbol: symbol,
                });

                view.graphics.add(graphic);
                return graphic;
            }
        });
    }, [isEdit]);

    function clickPoint(evt: { mapPoint: { longitude: number; latitude: number } }) {
        const params = {
            location: evt.mapPoint,
        };

        if (locator && isEdit) {
            locator.locationToAddress(params).then(
                function (response: { address: any }) {
                    // Show the address found
                    const address = response.address;
                    showAddress(address, evt.mapPoint);
                    setValueEdit({ diaChiDayDu: address, diaChiKinhDo: evt.mapPoint.longitude, diaChiViDo: evt.mapPoint.latitude, value: "" });
                },
                function (err: any) {
                    // Show no address found
                    showAddress("Địa chỉ không rõ", evt.mapPoint);
                }
            );
        }
    }

    // React.useEffect(() => {
    //     view && view.popup.close();
    // }, [isEdit === false]);

    function showAddress(address: string, pt: { longitude: number; latitude: number }) {
        if (view) {
            view.popup.open({
                title: +Math.round(pt.longitude * 100000) / 100000 + ", " + Math.round(pt.latitude * 100000) / 100000,
                content: address,
                location: pt,
            });
        }
    }

    return null;
};

export default LocatorTraCuu;
