import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const MAP_CONTAINER_STYLE = { width: "100%", height: "100%", borderRadius: 8 };
const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"; // <-- Replace with your actual API key

export default function MapSection({ location }) {
  const [center, setCenter] = useState({ lat: 25.276987, lng: 55.296249 }); // Default: Dubai
  const [zoomLevel, setZoomLevel] = useState(13);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    if (!location || !location.trim()) {
      setCenter({ lat: 25.276987, lng: 55.296249 });
      setZoomLevel(13);
      setIsLoaded(true);
      return;
    }
    let ignore = false;
    const fetchCoords = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
        );
        const data = await response.json();
        if (!ignore && data && data.length > 0) {
          setCenter({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
          setZoomLevel(13);
        }
      } catch { }
      setIsLoaded(true);
    };
    fetchCoords();
    return () => { ignore = true; };
  }, [location]);

  return (
    <div className="map-section" style={{ width: "100%", height: "100%" }}>
      <div
        className="map-container"
        lang="en"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          minWidth: 0,
          minHeight: 0,
          border: "1px solid #ccc",
          borderRadius: 8,
          overflow: "hidden"
        }}
      >
        <div style={{ width: "100%", height: "100%", borderRadius: 8 }}>
          <LoadScript googleMapsApiKey={"AIzaSyCT0crrJvNgo0wTqF1S7OQXom_DipI6Z9A"}>
            {!isLoaded ? (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading map...</div>
            ) : (
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%", borderRadius: 8 }}
                center={center}
                zoom={zoomLevel}
              >
                <Marker position={center} />
              </GoogleMap>
            )}
          </LoadScript>
        </div>
        <div className="map-footer">
          <span className="map-data">Map data ©2025 OpenStreetMap</span>
          <span className="scale">1000 km</span>
          <a href="#" className="terms">
            Terms
          </a>
        </div>
      </div>
    </div>
  );
}