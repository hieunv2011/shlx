import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Import Leaflet library
import axios from "axios";
import Footer from "./Footer";
export default function App() {
  const customIcon = L.icon({
    iconUrl: require("../assets/car.png"), // URL of the custom icon image
    iconSize: [100, 100], // Size of the icon
    iconAnchor: [16, 32], // Anchor point of the icon
    popupAnchor: [0, -32], // Popup anchor point
  });

  return (
    <div className="z-0">
      {/* <MapContainer
        center={[21.00017310940542, 105.84258300924056]}
        zoom={200}
        scrollWheelZoom={true}
        style={{ height: "81vh",width:"200vh" }}
        className="py-10 z-1000"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[21.00017310940542, 105.84258300924056]}
          icon={customIcon}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer> */}
      <MapContainer
        center={[21.00017310940542, 105.84258300924056]}
        zoom={200}
        scrollWheelZoom={true}
        className="py-10 z-1000"
      >
        {" "}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}
