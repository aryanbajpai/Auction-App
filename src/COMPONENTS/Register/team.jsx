import React, { useState } from "react";
import { Link } from "react-router-dom";

export const team = () => {

  //STATE VARIABLES
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({
    teamID: null,
    teamNm: "",
    balance: null,
    playersNo: "",
    password: "",
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

    // Check if ID or balance is less than zero
    if (formData.teamID < 0) {
      alert("ID cannot be less than zero.");
      return;
    }
    if (parseInt(formData.balance) < 1500000) {
      alert("Balance should be more than 1500000.");
      return;
    }

    //Validation
    if (
      !formData.teamID ||
      !formData.teamNm ||
      !formData.balance ||
      !formData.playersNo ||
      !formData.password
    ) {
      alert("Please fill in all details.");
      return;
    }

    const newTeam = {
      teamID: formData.teamID,
      teamNm: formData.teamNm,
      balance: parseInt(formData.balance),
      playersNo: formData.playersNo,
      password: formData.password,
    };

    const storedTeams = JSON.parse(localStorage.getItem("teams")) || [];
    //combine the content
    const combine = [...storedTeams, ...teams];

    //Check for same ID or name
    const isPresent = combine.some(
      (team) => team.teamID === newTeam.teamID || team.teamNm === newTeam.teamNm
    );
    if (isPresent) {
      alert("ID exists");
      return;
    }

    //add new details to localStorage
    const updateTeams = [...storedTeams, newTeam];
    localStorage.setItem("teams", JSON.stringify(updateTeams));

    setFormData({
      teamID: null,
      teamNm: "",
      balance: null,
      playersNo: "",
      password: "",
    });
    alert(`${formData.teamNm} Registered successfully`);
  };

  return (
    <div className="my-[4.4%]">

      <form className="border rounded-md m-auto w-[400px] px-4 py-2"
            onSubmit={handleSubmit}>

        <h1 className="text-[32px] font-semibold text-center">
          Team Registration Form
        </h1>
        <div className="text-lg my-2">
          <label>Team ID : </label>
          <input
            className="w-full py-1 px-3 outline-none focus:border-b-2 rounded bg-[#242424]"
            type="number"
            name="teamID"
            value={formData.teamID === null ? "" : formData.teamID}
            onChange={handleChange}
            placeholder="Enter ID for player..."
          />
        </div>
        <div className="text-lg my-2">
          <label>Team Name : </label>
          <input
            onChange={handleChange}
            className="w-full py-1 px-3 outline-none focus:border-b-2 rounded bg-[#242424]"
            type="text"
            name="teamNm"
            value={formData.teamNm}
            placeholder="Enter players name..."
          />
        </div>
        <div className="text-lg my-2">
          <label>Available Balance : </label>
          <input
            onChange={handleChange}
            className="w-full py-1 px-3 outline-none focus:border-b-2 rounded bg-[#242424]"
            type="number"
            name="balance"
            value={parseInt(formData.balance)}
            placeholder="Enter country of player..."
          />
        </div>
        <div className="text-lg my-2">
          <label>Number of Players : </label>
          <input
            onChange={handleChange}
            className="w-full py-1 px-3 outline-none focus:border-b-2 rounded bg-[#242424]"
            type="number"
            name="playersNo"
            value={formData.playersNo}
            placeholder="Enter players age..."
          />
        </div>
        <div className="text-lg my-2">
          <label>Password : </label>
          <input
            onChange={handleChange}
            className="w-full py-1 px-3 outline-none focus:border-b-2 rounded bg-[#242424]"
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter players age..."
          />
        </div>
        <div className="text-center ">
          <button
            type="submit"
            className="border my-2 px-3 py-1 text-lg rounded font-semibold hover:bg-white hover:text-black"
          >
            Register
          </button>
        </div>
      </form>

      <Link to={"/"} className="text-center m-auto">
        <div>
          <button className="border my-2 py-2 text-xl w-[400px] rounded-md font-semibold bg-white text-black hover:text-white hover:bg-[#242424]">
            DONE
          </button>
        </div>
      </Link>

    </div>
  );
};
