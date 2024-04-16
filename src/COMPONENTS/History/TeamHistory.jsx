import React, { useEffect, useState } from "react";

export const TeamHistory = () => {

  //STATE VARIABLE initially assigned with lclStrg
  const [teamHistory, setTeamHistory] = useState(JSON.parse(localStorage.getItem("teamHistory")) || []);

  //DATA retrieved from LocalStorage
  const loggedTeam = JSON.parse(localStorage.getItem("currentLoggedTeam")) || [];
  const mainHistory = JSON.parse(localStorage.getItem("history")) || [];

  //filters history lclStrg and retrive data that satisfies the cond
  const findTeam = mainHistory.filter(
    (team) => team.teamName === loggedTeam.teamNm
  );

  //SideEffect - renders when component mounts
  useEffect( () => {
    //updates lclStrg with the filtered data
    localStorage.setItem('teamHistory', JSON.stringify(findTeam))
      //State variable Func: 
      setTeamHistory(findTeam);
  }, [])  //Runs only for once when component mounts

  return (
    <div className="m-5 border relative rounded-md p-4 mb-2">
        <div>
          <h2 className="text-[35px] font-semibold text-center text-yellow-200">
            TEAM LIST
          </h2>
          <h2 className="text-[32px] font-semibold text-left text-yellow-200">
            {loggedTeam.teamNm}
          </h2>
          <table className="border-collapse text-xl border w-full border-gray-400 mt-2">
            <thead className="text-blue-300">
              <tr className="border-b border-gray-400">
                <th className="border-r w-[20%] border-gray-400 px-4 py-2">
                  Baught Player
                </th>
                <th className="border-r w-[20%] border-gray-400 px-4 py-2">
                  Base Price
                </th>
                <th className="border-r w-[20%] border-gray-400 px-4 py-2">
                  Sold Price
                </th>
                <th className="border-r w-[20%] border-gray-400 px-4 py-2">
                  Type
                </th>
                <th className="border-r w-[20%] border-gray-400 px-4 py-2">
                  Age
                </th>
              </tr>
            </thead>
            <tbody>
            {/* maps through teamHistory lclStrg and retrives data on the basis of indexes */}
            {teamHistory.map((entry, index) => (
                  <tr key={index} className="border-b border-gray-400">
                    <th className="border-r w-[20%] border-gray-400 px-4 py-2">
                      {entry.playerName}
                    </th>
                    <th className="border-r w-[20%] border-gray-400 px-4 py-2">
                      {entry.basePrice}
                    </th>
                    <th className="border-r w-[20%] border-gray-400 px-4 py-2">
                      {entry.currentPrice}
                    </th>
                    <th className="border-r w-[20%] border-gray-400 px-4 py-2">
                      {entry.type}
                    </th>
                    <th className="border-r w-[20%] border-gray-400 px-4 py-2">
                      {entry.age}
                    </th>
                  </tr>
            ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};
