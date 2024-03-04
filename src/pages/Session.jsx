import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
const Session = () => {
  const [data, setData] = useState([]);
  const [myVariable, setMyVariable] = useState(1);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [synced, setSynced] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [myVariable, name, id, synced]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(
        "https://jira.shlx.vn/v1/vehicles/8686",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.state);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const customIcon = L.icon({
    iconUrl: require("../assets/car.png"),
    iconSize: [100, 100],
    iconAnchor: [50, 50],
    popupAnchor: [0, -32],
  });

  const newMarkerPosition = [21.007926890088047, 105.84258846506063];

  return (
    <div className="flex pt-7">
      <div className="w-4/12">ê</div>
      <div className="w-8/12 pb-10">
        {data.lat && data.lng && (
          <MapContainer
            center={newMarkerPosition}
            zoom={18}
            scrollWheelZoom={true}
            className="w-[1023px] h-[625px]"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Marker mới */}
            <Marker position={newMarkerPosition} icon={customIcon}>
              <Popup>
                {data.trainee_name}
              </Popup>
            </Marker>

            {/* Vẽ đường từ marker mới đến marker có sẵn */}
            <Polyline
              positions={[newMarkerPosition, [data.lat, data.lng]]}
              color="blue"
            />
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default Session;
