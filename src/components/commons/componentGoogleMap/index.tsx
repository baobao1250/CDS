import { API_KEY_GOOGLE_MAP } from "constants/constants";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import React, { memo, useEffect, useRef, useState } from "react";
import GoogleMapReact from "google-map-react";
import locatorImg from "assets/images/locator_1.png";
export interface TraCuuBanDoProps {
    formik: any;
    series: any;
}

const TraCuuGoogleMap: React.FC<TraCuuBanDoProps> = ({ formik, series }) => {
    // vĩ độ latitude
    // kinh độ longitude
    const [zoom, setZoom] = React.useState(13.5); // initial zoom
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
        lat: 9.94719,
        lng: 106.34225,
    });
    const [marker, setArrMarker] = React.useState<google.maps.Marker>();
    const [googleApiObj, setIsGoogleApiLoadedObj] = useState<any>();
    const prevMarkersRef = useRef<any>([]);
    // const [dataArrayMarker, setDataArrayMarker] = React.useState<any[]>([]);

    const dataArrayMarker = [
        { ToaDo: "lng: 106.299291,lat: 9.812741", lng: 106.299291, lat: 9.812741, TieuDe: "TP Trà Vinh", NoiDung: "TP Trà Vinh" }, //
        { ToaDo: "lng: 106.2287,lat: 9.812741", lng: 106.2287, lat: 9.812741, TieuDe: "Huyện càng Long", NoiDung: "Huyện càng Long" },
        { ToaDo: "lng: 106.0611,lat: 9.8703", lng: 106.0611, lat: 9.8703, TieuDe: "Huyện Cầu Kè", NoiDung: "Huyện Cầu Kè" },
        { ToaDo: "lng: 106.1963,lat: 9.8097", lng: 106.1963, lat: 9.8097, TieuDe: "Huyện Tiểu Cần", NoiDung: "Huyện Tiểu Cần" },
        { ToaDo: "lng: 106.3552,lat: 10.3048", lng: 106.3552, lat: 10.3048, TieuDe: "Huyện Châu Thành", NoiDung: "Huyện Châu Thành" },
        { ToaDo: "lng: 106.299291,lat: 9.7919", lng: 106.4494, lat: 9.7919, TieuDe: "Huyện Cầu Ngang", NoiDung: "Huyện Cầu Ngang" },
        { ToaDo: "lng: 106.4494,lat: 9.7061}", lng: 106.2758, lat: 9.7061, TieuDe: "Huyện Trà Cú", NoiDung: "Huyện Trà Cú" },
        { ToaDo: "lng: 106.4877,lat: 9.6312", lng: 106.4877, lat: 9.6312, TieuDe: "Huyện Duyên Hải", NoiDung: "Huyện Duyên Hải" },
        { ToaDo: "lng: 106.5054,lat: 9.6357", lng: 106.5054, lat: 9.6357, TieuDe: "Thị xã Duyên Hải", NoiDung: "Thị xã Duyên Hải" },
        { ToaDo: "lng: 106.5054,lat: 9.6357", lng: 106.6584509, lat: 10.77724, TieuDe: "Nhà Trầm tỷ", NoiDung: "Cấm lại gần sở thú" },
    ];
    useEffect(() => {
        // var urlGetGoogleMapByAddress = "https://maps.googleapis.com/maps/api/geocode/json?address=";
        // const linkUrlGoogleMap = "https://maps.googleapis.com/maps/api/staticmap?center=40.714%2c%20-73.998&zoom=12&size=400x400&key=" + API_KEY_GOOGLE_MAP;
        // for (let i = 0; i <= 1; i++) {
        //     var url = urlGetGoogleMapByAddress + dataArrayMarkerGoogle[i].title + "&key=" + API_KEY_GOOGLE_MAP;
        //     axios.get(url).then((resp: any) => {
        //         if (resp.data && resp.data.status == "OK") {
        //             dataArrayMarkerGoogle[i].lat = resp.data.results[0].geometry.location.lat;
        //             dataArrayMarkerGoogle[i].lng = resp.data.results[0].geometry.location.lng;
        //         }
        //     });
        // }
    }, []);

    useEffect(() => {
        clearMarkers(prevMarkersRef.current);
        if (googleApiObj) {
            const { map, maps } = googleApiObj;
            loadMarkers(map, maps);
        }
    }, [googleApiObj, series, formik.values]);

    function createMarker(position: any, map: any) {
        return new window.google.maps.Marker({
            position: position,
            map: map,
        });
    }

    function clearMarkers(markers: any) {
        for (let m of markers) {
            m.setMap(null);
        }
    }

    const loadMarkers = (map: any, maps: any) => {
        if (formik.values.kichThuocFilter.length > 0) {
            if (formik.values.anChuThich) return;
            for (let i = 0; i < formik.values.kichThuocFilter.length; i++) {
                var title = "";
                var noiDung = "";
                for (let j = 0; j < series.length; j++) {
                    if (j == 0) {
                        title = series[0].data[i];
                    }
                    if (j != 0) {
                        noiDung += series[j].data[i] + " ";
                    }
                }
                noiDung = noiDung.replace("null", "");
                var split = formik.values.kichThuocFilter[i].split(",");
                // var split = "lng: 106.299291,lat: 9.812741".split(",");
                if (split.length == 2) {
                    const svgMarker = {
                        path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
                        fillColor: "red",
                        fillOpacity: 0.6,
                        strokeWeight: 0,
                        rotation: 0,
                        scale: 1,
                        anchor: new google.maps.Point(15, 30),
                    };
                    const marker = new maps.Marker({
                        position: { lng: Number(split[0].split(":")[1]), lat: Number(split[1].split(":")[1]) },
                        map,
                        icon: {
                            path: "m 12,2.4000002 c -2.7802903,0 -5.9650002,1.5099999 -5.9650002,5.8299998 0,1.74375 1.1549213,3.264465 2.3551945,4.025812 1.2002732,0.761348 2.4458987,0.763328 2.6273057,2.474813 L 12,24 12.9825,14.68 c 0.179732,-1.704939 1.425357,-1.665423 2.626049,-2.424188 C 16.809241,11.497047 17.965,9.94 17.965,8.23 17.965,3.9100001 14.78029,2.4000002 12,2.4000002 Z",
                            fillColor: formik.values.mauSacChuThich,
                            fillOpacity: 1.0,
                            strokeColor: "#000000",
                            scale: Number(formik.values.fontSizeChuThich),
                            // scale: new google.maps.Size(Number(formik.values.fontSizeChuThich), Number(formik.values.fontSizeChuThich)),
                        },
                        // label: {
                        //     text: "\ue177", // codepoint from https://fonts.google.com/icons
                        //     fontFamily: "Material Icons",
                        //     color: formik.values.mauSacChuThich,
                        //     fontSize: formik.values.fontSizeChuThich + "px",
                        // },
                        title: title,
                    });

                    prevMarkersRef.current.push(marker);
                    const infowindow = new google.maps.InfoWindow({
                        content: !formik.values.anGiaTri
                            ? "<div><p style=color:" +
                              formik.values.mauSacGiaTri +
                              ";" +
                              "font-size:" +
                              formik.values.fontSizeGiaTri +
                              "px" +
                              ">" +
                              noiDung +
                              "</p></div>"
                            : "",
                    });
                    marker.addListener("click", () => {
                        infowindow.open({
                            anchor: marker,
                            map,
                            shouldFocus: false,
                        });
                    });
                }
            }
        }
    };
    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: API_KEY_GOOGLE_MAP }}
                defaultCenter={center}
                defaultZoom={zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) =>
                    setIsGoogleApiLoadedObj({
                        map,
                        maps,
                    })
                }
            ></GoogleMapReact>
        </div>
    );
};
export default memo(TraCuuGoogleMap);
