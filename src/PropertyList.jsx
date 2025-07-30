import React, { useEffect, useState } from "react";

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/properties/")
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);
        // If data is an array, use it directly. If it's an object with results, use data.results
        setProperties(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Properties</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {properties.length === 0 ? (
          <div>No properties found.</div>
        ) : (
          properties.map((property) => (
            <div key={property.id} style={{ border: "1px solid #ccc", padding: 16, width: 300 }}>
              <h3>{property.title}</h3>
              <p>{property.description}</p>
              <p><b>Price:</b> {property.price} {property.currency}</p>
              <p><b>Area:</b> {property.area}</p>
              <p><b>City:</b> {property.city}</p>
              {/* Add more fields as needed */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PropertyList;
