import React, { useState } from "react";

export const Player = () => {
  const [players, setPlayers] = useState([]);
  const [formData, setFormData] = useState({
    playerID: null,
    playerNm: "",
    country: "",
    type: "",
    age: "",
    basePrice: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if ID or balance is less than 0
    if (formData.playerID < 0) {
      alert("ID cannot be less than 0");
      return;
    } if(formData.basePrice < 10000) {
      alert("Base Price should be more than 10,000");
      return;
    }

    if (
        !formData.playerID ||
        !formData.playerNm ||
        !formData.country ||
        !formData.type ||
        !formData.age ||
        !formData.basePrice
      ) {
        alert("Please fill in all details.");
        return;
      }

    const newPlayer = { 
        playerID: formData.playerID,
        playerNm: formData.playerNm,
        country: formData.country,
        type: formData.type,
        age: formData.age,
        basePrice: formData.basePrice,
     };

     const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
     const combine = [...storedPlayers, ...players];

     const isPresent = combine.some(
        (player) => player.playerID === newPlayer.playerID
     );
     if(isPresent){
        alert("ID exists")
        return;
     }

     const updatePlayers = [...storedPlayers, newPlayer];
     localStorage.setItem('players', JSON.stringify(updatePlayers));

    setFormData({
      playerID: null,
      playerNm: "",
      country: "",
      type: "",
      age: "",
      basePrice: 0,
    });
    alert('Player Registered successfully');
  };

  return (
    <div className="my-[6%]">
      <form
        className="border m-auto w-[400px] px-4 py-2"
        onSubmit={handleSubmit}
      >
        <h1 className="text-[32px] font-semibold text-center">
          Player Registration Form
        </h1>
        <div className="text-lg my-2">
          <label>Player's ID : </label>
          <input
            
            className="w-full py-1 px-3"
            type="number"
            name="playerID"
            value={formData.playerID === null ? '' : formData.playerID}
            onChange={handleChange}
            placeholder="Enter ID for player..."
          />
        </div>
        <div className="text-lg my-2">
          <label>Player's Name : </label>
          <input
            onChange={handleChange}
            className="w-full py-1 px-3"
            type="text"
            name="playerNm"
            value={formData.playerNm}
            placeholder="Enter players name..."
          />
        </div>
        <div className="text-lg my-2">
          <label>Country : </label>
          <input
            onChange={handleChange}
            className="w-full py-1 px-3"
            type="text"
            name="country"
            value={formData.country}
            placeholder="Enter country of player..."
          />
        </div>
        <div className="text-lg my-2">
  <label>Type : </label>
  <select
    onChange={handleChange}
    className="w-full py-1 px-2"
    value={formData.type}
    name="type"
  >
    <option value="">Select type of player...</option>
    <option value="Foriegn">Foriegn</option>
    <option value="Capped">Capped Indian</option>
    <option value="Uncapped">Uncapped Indian</option>
  </select>
</div>
        <div className="text-lg my-2">
          <label>Player's Age : </label>
          <input
            onChange={handleChange}
            className="w-full py-1 px-3"
            type="number"
            name="age"
            value={formData.age}
            placeholder="Enter players age..."
          />
        </div>
        <div className="text-lg my-2">
          <label>Base Price : </label>
          <input
            onChange={handleChange}
            className="w-full py-1 px-3"
            type="number"
            name="basePrice"
            value={formData.basePrice}
            placeholder="Enter players name..."
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="border px-3 py-1 text-lg font-semibold"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
