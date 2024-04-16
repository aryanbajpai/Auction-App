import React, { useState } from "react";

export const Player = () => {

  //STATE VARIABLES
  const [players, setPlayers] = useState([]);
  const [formData, setFormData] = useState({
    playerID: null,
    playerNm: "",
    country: "",
    type: "",
    age: "",
    basePrice: null,
    currentPrice: null,
  });

  const handleChange = (e) => {
    //destructures properties using target
    const { name, value } = e.target;
    setFormData({
      //stores newValues
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
    }
    if (formData.basePrice < 10000) {
      alert("Base Price should be more than 10,000");
      return;
    }

    //Validation
    if (
      !formData.playerID ||
      !formData.playerNm ||
      !formData.country ||
      !formData.type ||
      !formData.age ||
      !formData.basePrice ||
      !formData.currentPrice
    ) {
      alert("Please fill in all details.");
      return;
    }

    //sets values of newPlayer
    const newPlayer = {
      playerID: formData.playerID,
      playerNm: formData.playerNm,
      country: formData.country,
      type: formData.type,
      age: formData.age,
      basePrice: formData.basePrice,
      currentPrice: formData.currentPrice,
    };

    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
    //concat lclStrg and players array
    const combine = [...storedPlayers, ...players];

    //checks for presence of ID
    const isPresent = combine.some(
      (player) => player.playerID === newPlayer.playerID
    );
    if (isPresent) {
      alert("ID exists");
      return;
    }

    //destructures lclStrg and add newPlyr data
    const updatePlayers = [...storedPlayers, newPlayer];
    localStorage.setItem("players", JSON.stringify(updatePlayers)); //convert to JSON string

    setFormData({
      //set form to empty
      playerID: null,
      playerNm: "",
      country: "",
      type: "",
      age: "",
      basePrice: 0,
      currentPrice: 0,
    });
    alert("Player Registered successfully");
  };

  return (
    <div className="my-[2%]">
      <form
        className="border rounded-md m-auto w-[400px] px-5 py-3"
        onSubmit={handleSubmit}
      >
        <h1 className="text-[32px] font-semibold text-center">
          Player Registration Form
        </h1>
        <div className="text-lg my-2">
          <label>Player's ID : </label>
          <input
            className="w-full py-1 px-3 outline-none focus:border-b-2 rounded bg-[#242424]"
            type="number"
            name="playerID"
            value={formData.playerID === null ? "" : formData.playerID}
            onChange={handleChange}
            placeholder="Enter ID for player..."
          />
        </div>
        <div className="text-lg my-2">
          <label>Player's Name : </label>
          <input
            onChange={handleChange}
            className="w-full py-1 px-3 outline-none focus:border-b-2 rounded bg-[#242424]"
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
            className="w-full py-1 px-3 outline-none focus:border-b-2 rounded bg-[#242424]"
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
            className="w-full py-1 px-2 outline-none focus:border-b-2 rounded bg-[#242424]"
            value={formData.type}
            name="type"
          >
            <option value="">Select type of player...</option>
            <option value="Foriegn">Foriegn</option>
            <option value="Capped Indian">Capped Indian</option>
            <option value="Uncapped Indian">Uncapped Indian</option>
          </select>
        </div>
        <div className="text-lg my-2">
          <label>Player's Age : </label>
          <input
            onChange={handleChange}
            className="w-full py-1 px-3 outline-none focus:border-b-2 rounded bg-[#242424]"
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
            className="w-full py-1 px-3 outline-none focus:border-b-2 rounded bg-[#242424]"
            type="number"
            name="basePrice"
            value={formData.basePrice}
            placeholder="Enter players name..."
          />
        </div>
        <div className="text-lg my-2">
          <label>Current Price : </label>
          <input
            onChange={handleChange}
            className="w-full py-1 px-3 outline-none focus:border-b-2 rounded bg-[#242424]"
            type="number"
            name="currentPrice"
            value={formData.currentPrice}
            placeholder="Enter players name..."
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="border rounded hover:text-black hover:bg-white px-3 py-1 text-lg font-semibold"
          >
            Register
          </button>
        </div>

      </form>
    </div>
  );
};
