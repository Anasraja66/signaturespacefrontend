// app/property-details/components/RoomsSection.jsx
export default function RoomsSection({ rooms, additionalRooms }) {
  // Combine all rooms and additional rooms into a single array for mapping
  // Filter out any potential non-object items in case of malformed data
  const allRooms = [
    ...(Array.isArray(rooms) ? rooms.filter(r => typeof r === 'object' && r !== null) : []),
    ...(Array.isArray(additionalRooms) ? additionalRooms.filter(r => typeof r === 'object' && r !== null) : []),
  ];

  if (allRooms.length === 0) {
    return (
      <div className="card rooms-section">
        <h2>Rooms</h2>
        <p>No room details available for this property.</p>
      </div>
    );
  }

  return (
    <div className="card rooms-section">
      <h2>Rooms</h2>
      <div className="rooms-flex-grid">
        {allRooms.map((room, index) => (
          <div key={room.name ? `${room.name}-${index}` : index} className="room-card">
            <h3>{room.name || `Room ${index + 1}`}</h3> {/* Fallback name */}

            {/* Display the description. Assuming description holds the details. */}
            {room.description && (
              <p className="room-details-text">
                {room.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}