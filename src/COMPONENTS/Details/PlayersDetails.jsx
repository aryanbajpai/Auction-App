import React, { useState } from "react";
import playerLogo from "../../Images/playerInfo.png";

export const PlayersDetails = ({currentPlayerIndex, onNextPlayer}) => {
  const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [enteredPrice, setEnteredPrice] = useState(0);
  const [currentPlyrIndex, setCurrentPlayerIndex] = useState(currentPlayerIndex);
  //get current player on the basis of index
  const currentPlayer = storedPlayers[currentPlyrIndex];

  const bidding = () => {
       setIsInputVisible(true);
  }
  const bid= () => {
    const newPrice = enteredPrice !== 0 ? enteredPrice : currentPlayer.basePrice;
     setIsInputVisible(false);
     currentPlayer.currentPrice = newPrice;
     const newIndex = currentPlyrIndex + 1;
     setCurrentPlayerIndex(newIndex)
  }

  const handleAmountChange = (e) => {
    setEnteredPrice(Number(e.target.value));
  }

  const skip = () =>{
     setIsInputVisible(false);
     const newIndex = currentPlyrIndex + 1;
     setCurrentPlayerIndex(newIndex)
  }

  return (
    <div>
      { currentPlayer && (
        <div className="mx-5 border p-2 mb-2">
          <h2 className="text-[27px] font-semibold">Player Info</h2>
          <div className="flex gap-3 text-lg mt-2">
            <div className="m-auto">
              <img
                className="w-[300px] h-[360px]"
                src={playerLogo}
                alt="Team Logo"
              />
            </div>
            <div className=" p-3 w-[300px]">
              <div className=" pb-2">
                <p>Players Name : </p>
                <p>{currentPlayer.playerNm}</p>
              </div>
              <div className="pb-2">
                <p>Country : </p>
                <p>{currentPlayer.country}</p>
              </div>
              <div className="pb-2">
                <p>Type : </p>
                <p>{currentPlayer.type}</p>
              </div>
              <div className="pb-2">
                <p>Age : </p>
                <p>{currentPlayer.age}</p>
              </div>
              <div className="pb-2">
                <p>Base Price : </p>
                <p>{currentPlayer.basePrice}</p>
              </div>
              <div className="pb-2">
                <p>Current Price : </p>
                <p>{currentPlayer.basePrice}</p>
              </div>
            </div>
          </div>
          <div className="text-center mb-4">
              <button className="text-lg font-semibold px-3 py-1 border mx-3 w-[120px]" onClick={bidding}>Make a Bid</button>
              <button className="text-lg font-semibold px-3 py-1 border w-[120px]" onClick={skip}>Skip</button>
          </div>
          <div className={`text-lg my-2 text-center transition-opacity duration-500 ${isInputVisible ? 'opacticity-100' : 'opacity-0 hidden'}`}>
             <label>Enter Amount : </label>
             <input className="px-2 py-1 w-[100px]" type="number" placeholder="Amount" onChange={handleAmountChange}/>
             <button className="text-lg font-semibold px-3 py-1 border mx-3 w-[90px]" onClick={bid}>Bid</button>
          </div>
        </div>
      )}
    </div>
  );
};
