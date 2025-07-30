// app/property-details/components/LocationSection.jsx
import { renderIcon } from "../../utils/renderIcon"
import { GoogleMap, Marker } from "@react-google-maps/api"

const MAP_CONTAINER_STYLE = { width: "100%", height: "300px" }

export default function LocationSection({ location, locationDetails, isLoaded }) {

  return (
    <div className="card location-section">
      <h2>Location</h2>
      <p className="text-sm text-gray-500 mb-4">What's nearby</p>
      <div className="location-details-list">
        {(Array.isArray(locationDetails) ? locationDetails : []).map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            {renderIcon(item.icon)}
            <span>{item.text}</span>
          </div>
        ))}
      </div>
      <div className="location-map-container" style={{ marginTop: "1rem" }}>
        {(!location?.lat && !location?.lng && !location?.latitude && !location?.longitude) && (
          <div style={{ color: 'red', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Location data not provided by backend. Showing default location (Dubai).
          </div>
        )}
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={MAP_CONTAINER_STYLE}
            center={{
              lat: location?.lat ?? location?.latitude ?? 25.2048,
              lng: location?.lng ?? location?.longitude ?? 55.2708
            }}
            zoom={15}
          >
            <Marker position={{
              lat: location?.lat ?? location?.latitude ?? 25.2048,
              lng: location?.lng ?? location?.longitude ?? 55.2708
            }} />
          </GoogleMap>
        ) : (
          <div>Loading map...</div>
        )}
      </div>
    </div>
  )
}