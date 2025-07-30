import React from "react";

function MakePayment() {
  const handlePayment = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      booking: 2,
      amount: 60000,
      method: "Visa"
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:8000/api/payments/payments/initiate/", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  return (
    <button onClick={handlePayment}>
      Make Payment
    </button>
  );
}

export default MakePayment;
