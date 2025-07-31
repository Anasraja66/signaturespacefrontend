import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const MAP_CONTAINER_STYLE = { width: "100%", height: "100%", borderRadius: 8 };


export default function MapSection({ location, properties = [], showAsPopup = false, onClose }) {
  const [center, setCenter] = useState({ lat: 25.276987, lng: 55.296249 }); // Default: Dubai
  const [zoomLevel, setZoomLevel] = useState(13);
  const [isLoaded, setIsLoaded] = useState(false);

  // Determine map location using same logic as ListingPage
  const mapLocation =
    properties && properties.length > 0
      ? properties[0].area || properties[0].city || location
      : location;

  useEffect(() => {
    setIsLoaded(false);
    if (!mapLocation || !mapLocation.trim()) {
      setCenter({ lat: 25.276987, lng: 55.296249 });
      setZoomLevel(13);
      setIsLoaded(true);
      return;
    }
    let ignore = false;
    const fetchCoords = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(mapLocation)}`
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
  }, [mapLocation]);

  // Render as popup overlay if showAsPopup is true
  if (showAsPopup) {
    return (
      <div className="map-popup-overlay" style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div className="map-popup-content" style={{
          background: "white",
          borderRadius: 12,
          width: "100vw",
          height: "100vh",
          maxWidth: "100vw",
          maxHeight: "100vh",
          position: "relative"
        }}>
          <button
            className="map-popup-close"
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 10001,
              background: "#222",
              color: "#fff",
              border: "none",
              borderRadius: 24,
              padding: "8px 16px",
              fontSize: 18,
              cursor: "pointer"
            }}
            onClick={onClose}
          >
            Close
          </button>
          <div style={{ width: "100%", height: "100%", borderRadius: 8 }}>
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

  // Default desktop view
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