import React from 'react'
import player from "../Images/player.png"
import team from '../Images/team.png'
import { Link } from 'react-router-dom'

export const Register = () => {
  return (
    <div className='lg:my-[10.7%] my-[18%] mx-[70px] lg:mx-[500px]'>
      <div className='flex gap-5 '>
        <div className='border text-center'>
            <img className='w-[300px] h-[300px]' src={player} alt='Players'/>
            <Link to={"/playerReg"}><button className='border px-3 py-1 my-3'>Register Player</button></Link>
        </div>
        <div className='border text-center'>
            <img className='w-[300px] h-[300px]' src={team} alt='Team'/>
            <Link to={"/teamReg"}><button className='border px-3 py-1 my-3'>Register Teams</button></Link>
        </div>
      </div>
    </div>
  )
}
