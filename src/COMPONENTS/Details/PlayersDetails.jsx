import React, { useEffect, useState } from "react";
import playerLogo from "../../Images/playerInfo.png";
import { useNavigate } from "react-router-dom";

export const PlayersDetails = ({currentPlayerIndex, loggedTeam}) => {

  //data from lclStrg
  const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
  const storedTeams = JSON.parse(localStorage.getItem("teams")) || [];
  const soldPLayers = JSON.parse(localStorage.getItem("soldPlayers")) || [];
  const storedPlayerArr = JSON.parse(localStorage.getItem('plyrARR')) || [];
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem("history")) || []);
  const navigate = useNavigate();

  //STATE VARIABLES
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [enteredPrice, setEnteredPrice] = useState(null);
  const [currentPlyrIndex, setCurrentPlayerIndex] = useState(currentPlayerIndex);
  const [playerArr, setPlayerArr] = useState(storedPlayerArr);
  
  //get current player on the basis of index
  const currentPlayer = storedPlayers[currentPlyrIndex];

  //check if player is in sold lclStrg
  const playerInSold = soldPLayers.includes(currentPlayer.playerNm);
  
  //SideEffect sets playerArr with teamID from teams lclStrg
  useEffect(() => {
    const teams = storedTeams.map(team => team.teamID);
    setPlayerArr(teams);
  }, []);

  //check if playerArr length in lclStrg is 0 if yes then adds playerArr to it 
  if( storedPlayerArr.length === 0){
     console.log("Store EMPTY...")
     localStorage.setItem('plyrARR', JSON.stringify(playerArr))
  }

  //checks if team at 0th index is = loggedteam teamID
  const isBidButtonClickable = () => {
    return storedPlayerArr.length > 0 && storedPlayerArr[0] === loggedTeam.teamID;
  };

  const bidding = () => {
    if (!isBidButtonClickable()) {
      alert("Wait for your turn...");
      return;
    } else {
      //make the bid section visible
      setIsInputVisible(true);
    }
  };

  //triggered when value is entered in input field and set that value
  const handleAmountChange = (e) => {
    setEnteredPrice(e.target.value);
  };

  const bid = () => {
    //takes the entered value to check if > currentPrice
    const enteredVal = Number(enteredPrice);
    
    if (enteredVal <= parseInt(currentPlayer.currentPrice)) {   //if FALSE
      alert("!! BID FOR HIGHER AMOUNT OR-ELSE SKIP THE PLAYER. !!");
      return;
    } else {
      //sets enterPrc to newPrc => ternaty operator
      const newPrice =
        enteredPrice !== 0
          ? enteredPrice
          : parseInt(currentPlayer.currentPrice);
      //the new currentPrice is newPrc
      currentPlayer.currentPrice = newPrice;

      if (newPrice < currentPlayer.basePrice) {
        alert("OOPS! AMount is less than base price...");
        return;
      }
      // Retrieve stored players array from localStorage
      const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];

      // Update currentPrice for currentPlayer in storedPlayers array
      storedPlayers[currentPlyrIndex].currentPrice = newPrice;

      // Update players array in localStorage
      localStorage.setItem("players", JSON.stringify(storedPlayers));

      // Update history
      const newHistoryEntry = {
        playerName: currentPlayer.playerNm,
        basePrice: currentPlayer.basePrice,
        currentPrice: newPrice,
        teamName: loggedTeam.teamNm,
        type: currentPlayer.type,
        age: currentPlayer.age,
      };

      //destructures old history and adds newOne
      setHistory([...history, newHistoryEntry]);
      setIsInputVisible(false); //make bid section hidden
      //UPDATE lclStrg
      localStorage.setItem("history", JSON.stringify([...history, newHistoryEntry]));

      //increment the index of player and make nxt player info visible
      const newIndex = currentPlyrIndex + 1;
      setCurrentPlayerIndex(newIndex);
      if (newIndex >= storedPlayers.length) {
        storedPlayerArr.shift();    //removes 1st elem from storedPlayerArr
        localStorage.setItem('plyrARR', JSON.stringify(storedPlayerArr));  //set updated storedPlaerArr
        navigate("/done");
        return;
      }
      setIsInputVisible(false);
      setEnteredPrice(null);
    }
  };

  //changes the index of plyr and shows nxt player info
  const skip = () => {
    //checks if player is SOLD
    if ( soldPLayers.includes(currentPlayer.playerNm) ) {
      const newIndex = currentPlyrIndex + 1;
      setCurrentPlayerIndex(newIndex);
      setIsInputVisible(false);
      if (newIndex >= storedPlayers.length) {
        navigate("/done");
        return;
      }
    } else if (!isBidButtonClickable()) {
      alert("Wait for your turn...");
      return;
    }

    const newIndex = currentPlyrIndex + 1;
    setCurrentPlayerIndex(newIndex);
    setIsInputVisible(false);
    if (newIndex >= storedPlayers.length) {
      storedPlayerArr.shift();     //removes 1st elem from storedPlayerArr
      localStorage.setItem('plyrARR', JSON.stringify(storedPlayerArr));   //set updated storedPlaerArr
      navigate("/done");
      return;
    }
  };

  return (
    <>
      <div>
        {currentPlayer && ( // IF currentPlayer TRUE
          <div className="mx-5 border rounded-md p-2 mb-2">
            <h2 className="text-[27px] font-semibold">Player Info</h2>
            <div className="grid grid-cols-[50%_minmax(50%,_1fr)] text-lg mt-2">
              <div className="m-auto">
                <img
                  className="w-[300px] h-[360px]"
                  src={playerLogo}
                  alt="Team Logo"
                />
              </div>
              <div className="flex gap-3 py-6 w-full">
                <div className="text-lg">
                  <p className="my-2">Name </p>
                  <p className="my-2">Country </p>
                  <p className="my-2">Type </p>
                  <p className="my-2">Age </p>
                  <p className="my-2">Base Price </p>
                  <p className="my-2">Current Price </p>
                </div>
                <div className="text-blue-300 text-lg">
                  <p className="my-2"> : {currentPlayer.playerNm}</p>
                  <p className="my-2"> : {currentPlayer.country}</p>
                  <p className="my-2"> : {currentPlayer.type}</p>
                  <p className="my-2"> : {currentPlayer.age}</p>
                  <p className="my-2"> : {currentPlayer.basePrice}</p>
                  <p className="my-2"> : {parseInt(currentPlayer.currentPrice)}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-center">

              {playerInSold ? (   //If player is SOLD 
                   //IF player is SOLD true then 
                <p className="text-[22px] text-center text-red-400">
                  {currentPlayer.playerNm} is <span className="text-yellow-300">SOLD</span>
                </p>
              ) : (  //If player not SOLD then
                <div className="text-center mb-3">
                  <button
                    id="makeBid"
                    className="text-lg text-center rounded hover:text-black hover:bg-white font-semibold px-3 py-1 border w-[120px]"
                    onClick={bidding}
                  >
                    Make a Bid
                  </button>
                </div>
              )}

              <div className="text-center mb-3">
                <button
                  className="text-lg rounded hover:text-black hover:bg-white font-semibold px-3 py-1 border w-[120px]"
                  onClick={skip}
                >
                  Skip
                </button>
              </div>
            </div>

            {isInputVisible && ( // If isInputVisible TRUE
              <div className="text-lg my-2 text-center transition-opacity duration-500">
                <label>Enter Amount : </label>
                <input
                  className="px-2 py-1 w-[100px] bg-transparent focus:border-b-2 outline-none rounded"
                  type="number"
                  value={enteredPrice}
                  placeholder="Amount"
                  onChange={handleAmountChange}
                />
                <button
                  className="text-lg rounded hover:text-white hover:bg-[#242424] text-black bg-white font-semibold px-3 py-1 border mx-3 w-[90px]"
                  onClick={bid}
                >
                  Bid
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};