import React, { useState, useEffect } from "react";
import teamLogo from "../../Images/iplLogo.png";
import { PlayersDetails } from "./PlayersDetails";
import { Link } from "react-router-dom";

export const TeamDetails = () => {

  const soldPlayers = JSON.parse(localStorage.getItem('soldPlayers')) || [];
  const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
  const playerList = storedPlayers.map( (player) => player.playerNm);

  const showBtn = soldPlayers.length === playerList.length;

  //STATE VARIABLES
  const [loggedTeam, setLoggedTeam] = useState(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  //SideEffect : gets current team lclStrg and set it to loggedTeam state variable
  useEffect(() => {
    // Fetch the logged team data from localStorage
    const storedLoggedTeam = JSON.parse(localStorage.getItem("currentLoggedTeam"));
    if (storedLoggedTeam) {
      //set the currentLoggedTeam
      setLoggedTeam(storedLoggedTeam);
    }
  }, []);

  return (
    <div>
      {/*Conditional rendering*/}
      {loggedTeam && (    //if team Logged 
        <div className="m-3">
          <div className="flex justify-between items-center mt-4 mb-3 mx-3">
            <h1 className="text-[32px] font-semibold mb-2">
              {loggedTeam.teamNm}
            </h1>

            {showBtn && (
            <div className="text-right mb-2">
              <Link to={"/teamHistory"}>
                <button className="text-xl font-[600] py-2 w-[120px] rounded bg-white hover:bg-[#242424] text-black hover:text-white border">
                  LIST
                </button>
              </Link>
            </div>
            )}
          </div>

          <div className="lg:grid grid-cols-2 ">
            <div className="mx-5 border rounded-md p-2 mb-2">
              <h2 className="text-[27px] font-semibold">Team Info</h2>
              <div className="flex gap-3 text-lg mt-2 main">
                <div className=" bg-white m-auto rounded-md">
                  <img
                    className="w-[300px] h-[350px]"
                    src={teamLogo}
                    alt="Team Logo"
                  />
                </div>
                <div className="p-3 w-[300px]">
                  <div className=" py-2">
                    <p>Team Name : </p>
                    <p className="text-yellow-300 txtGrw">
                      {loggedTeam.teamNm}
                    </p>
                  </div>
                  <div className="py-2">
                    <p>Available Balanace : </p>
                    <p className="flex gap-1 text-yellow-300">
                      <span className="txtGrw">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 my-auto"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </span>
                      <span className="txtGrw">{loggedTeam.balance}</span>
                    </p>
                  </div>
                  <div className="py-2">
                    <p>Number of Players : </p>
                    <p className="text-yellow-300 txtGrw">
                      {loggedTeam.playersNo} <span>Players</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <PlayersDetails
              currentPlayerIndex={currentPlayerIndex}
              loggedTeam={loggedTeam}
            />
          </div>
        </div>
      )}
    </div>
  );
};
