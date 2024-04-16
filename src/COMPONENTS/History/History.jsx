import React, { useState } from "react";

const History = () => {

  //state var declared with localStorage initially
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem("history")) || []);
  //to track sold players
  const [soldPlayers, setSoldPlayers] = useState(JSON.parse(localStorage.getItem("soldPlayers")) || []);

  // const [changeClr, setChangeClr] = useState(false);
  const storedTeam = JSON.parse(localStorage.getItem("teams")) || [];


  // const sold = (playerName, teamName, playerID) => {
  //   const updateHis = history.filter((entry) => {
  //     //filters from localStorage and keeps data that matched to condition
  //     if (entry.teamName === teamName && entry.playerName === playerName ) {
  //       return {
  //         ...entry,
  //         status: "SOLD",
  //       };
  //     }
  //     return entry.playerName !== playerName;
  //   });

  //   const soldPlayer = history.find(
  //     //finds the player in lclStrg for which SELL btn clicked
  //     (entry) => entry.playerName === playerName && entry.teamName === teamName && entry.id === id
  //   );
  //   const price = soldPlayer.currentPrice;

  //   //update Team Balance
  //   const updateTeamBal = storedTeam.map((team) => {
  //     //find team same as team in btn clicked row
  //     if (team.teamNm === teamName) {
  //       return {
  //         //spreads data for that team and adds updated bal
  //         ...team,
  //         balance: team.balance - price,
  //       };
  //     }
  //     return team;
  //   });

  //   setHistory(updateHis); //set the updated history to lclStrg
  //   setSoldPlayers([...soldPlayers, playerName]);  //adding the player in sold array

  //   localStorage.setItem("history", JSON.stringify(updateHis));
  //   localStorage.setItem("teams", JSON.stringify(updateTeamBal));
  //   localStorage.setItem("soldPlayers",JSON.stringify([...soldPlayers, playerName]));
  // };

  const sold = (playerName, teamName, currentPrice) => {
    const updateHis = history.filter((entry) => {
      //filters from localStorage and keeps data that matched to condition
      if (entry.teamName === teamName && entry.playerName === playerName && entry.currentPrice === currentPrice ) {
        return {
          ...entry,
          status: "SOLD",
        };
      }
      return entry.playerName !== playerName;
    });

    const soldPlayer = history.find(
      //finds the player in lclStrg for which SELL btn clicked
      (entry) => entry.playerName === playerName && entry.teamName === teamName
    );
    const price = soldPlayer.currentPrice;
    console.log(soldPlayer.currentPrice)

    //update Team Balance
    //update Team Balance
    const updateTeamBal = storedTeam.map((team) => {
      //find team same as team in btn clicked row
      if (team.teamNm === teamName) {
        return {
          //spreads data for that team and adds updated bal
          ...team,
          balance: team.balance - price,
        };
      }
      return team;
    });

    setHistory(updateHis); //set the updated history to lclStrg
    setSoldPlayers([...soldPlayers, playerName]);  //adding the player in sold array

    localStorage.setItem("history", JSON.stringify(updateHis));
    localStorage.setItem("teams", JSON.stringify(updateTeamBal));
    localStorage.setItem("soldPlayers",JSON.stringify([...soldPlayers, playerName]));
  };


  return (
    <div className="m-5 border relative rounded-md p-4 mb-2">
      <h2 className="text-[35px] font-semibold text-center text-yellow-200">
        Bidding History
      </h2>
      <table className="border-collapse text-xl border w-full border-gray-400 mt-2">
        <thead className="text-blue-300">
          <tr className="border-b border-gray-400">
            <th className="border-r w-[20%] border-gray-400 px-4 py-2">
              Player Name
            </th>
            <th className="border-r w-[20%] border-gray-400 px-4 py-2">
              Base Price
            </th>
            <th className="border-r w-[20%] border-gray-400 px-4 py-2">
              Current Price
            </th>
            <th className="border-r w-[20%] border-gray-400 px-4 py-2">
              Team Name
            </th>
            <th className="px-4 py-2 w-[20%]">Status</th>
          </tr>
        </thead>
        <tbody>
         {/* checks if history is an array or not */}
          {Array.isArray(history) &&
            //map through history lclStrg and display data on the basis of indexes
            history.map((entry, index) => {
              {/*button rendering: checks if player is in sold array : Stores in isSold which is disabled first*/}
              const isSold = soldPlayers.includes(entry.playerName);
              return (
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
                    {entry.teamName}
                  </th>
                  <th className="px-4 py-2 w-[20%]">
                    <button
                      className="border-[2px] rounded-3xl w-[100px] font-serif py-1 text-lg bg-green-400 text-red-600"
                      onClick={() => sold(entry.playerName, entry.teamName, entry.currentPrice)}
                      disabled={isSold} //disables btn when player SOLD
                    >
                      {isSold ? "SOLD" : 'SELL'}
                    </button>
                  </th>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default History;
