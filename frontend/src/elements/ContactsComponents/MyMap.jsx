
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../ContactsComponents/Map.css"
import L from "leaflet";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import { renderToStaticMarkup } from "react-dom/server";
import "./Map.css"


export default function MyMap() {
    const position = [49.79944200070472, 30.116352621152526];

    const iconMarkup = renderToStaticMarkup(
        <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "red", fontSize: "25px",backgroundColor:"transparent"}} />
    );

    const faIcon = L.divIcon({
        html: iconMarkup,
        className:"mapIconContainer",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    return (
        <MapContainer
            center={position}
            zoom={13}
           className={"mapContainer"}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={position} icon={faIcon}>
                <Popup>ТЕХНОСФЕРА</Popup>
            </Marker>

        </MapContainer>
    );
}
