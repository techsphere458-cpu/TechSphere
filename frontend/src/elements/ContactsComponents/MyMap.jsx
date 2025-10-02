
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../ContactsComponents/Map.css"

export default function MyMap() {
    const position = [49.79944200070472, 30.116352621152526];

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
            <Marker position={position}>
                <Popup>ТЕХНОСФЕРА</Popup>
            </Marker>

        </MapContainer>
    );
}
