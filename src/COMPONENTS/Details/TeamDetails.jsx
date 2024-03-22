import React, {useState, useEffect} from "react";
import teamLogo from "../../Images/iplLogo.png";
import { PlayersDetails } from "./PlayersDetails";

export const TeamDetails = () => {

  const [loggedTeam, setLoggedTeam] = useState(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  useEffect(() => {
    // Fetch the logged team data from localStorage
    const storedLoggedTeam = JSON.parse(localStorage.getItem("currentLoggedTeam"));
    if (storedLoggedTeam) {
      setLoggedTeam(storedLoggedTeam);
    }
  }, []);

  return (
    <div>
    { loggedTeam && (
    <div className="m-3">
      <h1 className="text-[32px] font-semibold">{loggedTeam.teamNm}</h1>
      <div className="lg:grid grid-cols-2 ">
        <div className="mx-5 border p-2 mb-2">
          <h2 className="text-[27px] font-semibold">Team Info</h2>
          <div className="flex gap-3 text-lg mt-2">
            <div className=" bg-white m-auto">
              <img
                className="w-[300px] h-[350px]"
                src={teamLogo}
                alt="Team Logo"
              />
            </div>
            <div className="p-3 w-[300px]">
              <div className=" py-2">
                <p>Team Name : </p>
                <p>{loggedTeam.teamNm}</p>
              </div>
              <div className="py-2">
                <p>Available Balanace : </p>
                <p className="flex gap-2">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </span>
                  <span>{loggedTeam.balance}</span>
                </p>
              </div>
              <div className="py-2">
                <p>Number of Players : </p>
                <p>{loggedTeam.playersNo}</p>
              </div>
            </div>
          </div>
        </div>

        <PlayersDetails currentPlayerIndex={currentPlayerIndex}/>
      </div>
    </div>
    )}
    </div>
  );
};
