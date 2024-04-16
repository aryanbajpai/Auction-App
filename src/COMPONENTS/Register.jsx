import React from "react";
//exported images
import player from "../Images/player.png";
import team from "../Images/team.png";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <>
      <div className="text-right">
        <Link to={"/history"}>
          <button className="text-xl font-[600] py-2 w-[120px] rounded bg-white hover:bg-[#242424] text-black hover:text-white border m-5 mb-0">
            LIST
          </button>
        </Link>
      </div>
      <div className="lg:my-[6%] my-[18%] mx-[70px] lg:mx-[500px]">
        <div className="flex gap-5 ">
          <div className="border rounded-md text-center hover:scale-[1.06] duration-300">
            <img className="w-[300px] h-[300px]" src={player} alt="Players" />
            <Link to={"/playerReg"}>
              <button className="border rounded hover:text-black hover:bg-white text-lg font-semibold px-3 py-1 my-3">
                Register Player
              </button>
            </Link>
          </div>
          <div className="border rounded-md text-center hover:scale-[1.06] duration-300">
            <img className="w-[300px] h-[300px]" src={team} alt="Team" />
            <Link to={"/teamReg"}>
              <button className="border rounded hover:text-black hover:bg-white text-lg font-semibold px-3 py-1 my-3">
                Register Teams
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
