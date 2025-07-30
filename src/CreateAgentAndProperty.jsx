import React, { useState } from "react";

function CreateAgentAndProperty() {
  const [agentId, setAgentId] = useState(null);
  const [agentLoading, setAgentLoading] = useState(false);
  const [propertyLoading, setPropertyLoading] = useState(false);
  const [agentResult, setAgentResult] = useState(null);
  const [propertyResult, setPropertyResult] = useState(null);

  const handleCreateAgent = () => {
    setAgentLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name: "Ali Agent",
      email: "aliagent@email.com",
      phone: "03001234567"
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:8000/api/agents/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAgentResult(result);
        setAgentId(result.id);
        setAgentLoading(false);
      })
      .catch((error) => {
        setAgentResult(error);
        setAgentLoading(false);
      });
  };

  const handleCreateProperty = () => {
    if (!agentId) return;
    setPropertyLoading(true);
    const propertyHeaders = new Headers();
    propertyHeaders.append("Content-Type", "application/json");

    const propertyRaw = JSON.stringify({
      title: "Luxury Apartment",
      description: "Best in town",
      address: "DHA, Lahore",
      price: 12000,
      currency: "PKR",
      type: "Apartment",
      room_booking: false,
      total_rooms: 3,
      room_price: 12000,
      is_available: true,
      available_from: "2024-08-01",
      available_to: "2024-08-31",
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      children: 2,
      pet_friendly: false,
      location: {},
      overview: {},
      features: {},
      agent: agentId,
      city: "Lahore",
      area: "DHA",
      base: "daily"
    });

    const propertyOptions = {
      method: "POST",
      headers: propertyHeaders,
      body: propertyRaw,
      redirect: "follow"
    };

    fetch("http://localhost:8000/api/properties/", propertyOptions)
      .then((response) => response.json())
      .then((result) => {
        setPropertyResult(result);
        setPropertyLoading(false);
      })
      .catch((error) => {
        setPropertyResult(error);
        setPropertyLoading(false);
      });
  };

  return (
    <div>
      <button onClick={handleCreateAgent} disabled={agentLoading}>
        {agentLoading ? "Creating Agent..." : "Create Agent"}
      </button>
      {agentResult && (
        <div style={{ margin: "10px 0" }}>
          <b>Agent Response:</b> <pre>{JSON.stringify(agentResult, null, 2)}</pre>
        </div>
      )}
      <button onClick={handleCreateProperty} disabled={!agentId || propertyLoading}>
        {propertyLoading ? "Creating Property..." : "Create Property (with Agent ID)"}
      </button>
      {propertyResult && (
        <div style={{ margin: "10px 0" }}>
          <b>Property Response:</b> <pre>{JSON.stringify(propertyResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default CreateAgentAndProperty;
