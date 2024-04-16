import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const BuyerForm = () => {

  //STATE VARIABLES
  const navigate = useNavigate();
  const [formData, setFormData] = useState({id: "", teamNm: "", password: "" });

  const handleChange = (e) => {
    //destructures properties using target
    const { name, value } = e.target;
    setFormData({
      //spreads formData and stores newVal
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Retrieve data from localStorage
    const teamData = JSON.parse(localStorage.getItem("teams")) || [];

    //Match entered data
    const matchTeam = teamData.find(
      (team) =>
        team.teamID === formData.id &&
        team.teamNm === formData.teamNm &&
        team.password === formData.password
    );

    //set the updates to localStorage
    localStorage.setItem('currentLoggedTeam', JSON.stringify(matchTeam));

    if (matchTeam) {
      alert("Logged In Successfully");
      navigate("/teamDetails");
    } else {
        alert("Please try again")
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="border rounded-md px-6 py-4 w-[350px] m-auto my-[19.5%] lg:my-[8%]"
      >
        <h1 className="text-[32px] text-center font-semibold mb-3">
          TEAM LOGIN
        </h1>
        <div className="w-full py-2">
          <label className="text-lg">Buyer ID : </label>
          <input
            className="w-full text-lg py-1 px-3 outline-none focus:border-b-2 rounded bg-[#242424]"
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Enter team ID..."
          />
        </div>
        <div className="w-full py-2">
          <label className="text-lg">Team Name : </label>
          <input
            className="w-full text-lg py-1 px-3 outline-none focus:border-b-2 rounded bg-[#242424]"
            type="text"
            name="teamNm"
            value={formData.teamNm}
            onChange={handleChange}
            placeholder="Enter team name..."
          />
        </div>
        <div className="w-full py-2">
          <label className="text-lg">Password : </label>
          <input
            className="w-full text-lg py-1 px-3 outline-none focus:border-b-2 rounded bg-[#242424]"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password..."
          />
        </div>
        <button
          type="submit"
          className="my-2 border mx-[33%] px-2 py-2 w-[100px] rounded hover:text-black hover:bg-white text-lg font-semibold"
        >
          LOG IN
        </button>
      </form>
    </div>
  );
};
