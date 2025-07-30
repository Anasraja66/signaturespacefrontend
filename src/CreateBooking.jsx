import React from "react";

function CreateBooking() {
  const handleCreateBooking = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      property: 1,
      user: null,
      guest_name: "Ali Khan",
      guest_email: "ali@example.com",
      guest_phone: "03001234567",
      check_in: "2024-08-01",
      check_out: "2024-08-05",
      guests: 2,
      total_price: 48000,
      status: "pending",
      payment_status: "pending"
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:8000/api/bookings/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        alert("Booking created!");
      })
      .catch((error) => {
        console.error(error);
        alert("Error creating booking!");
      });
  };

  return (
    <button onClick={handleCreateBooking}>
      Create Booking
    </button>
  );
}

export default CreateBooking;
