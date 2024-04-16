import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div>
    {/*Redirects to Home component*/}
    <Link to={"/"}>
      <h1 className="text-[40px] font-[500] border-b-[2px] px-4 ">
        <i>
          <span className="text-orange-500">I</span>
          <span>P</span>
          <span className="text-green-500">L</span> -  
          <span className='text-yellow-400'> Auction</span>
        </i>
      </h1>
    </Link>
    </div>
  );
};
