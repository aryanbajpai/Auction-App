import React from 'react'
import Home from '../Images/hme.png'
import { Link } from 'react-router-dom'

export const BiddingDone = () => {
  return (
    <div className='text-xl text-center my-16 font-semibold'>
        <h1 className='text-[40px] font-[600] my-8'>Bidding done successfully...</h1>
        <p><i>Return to <Link to={'/'}><u className='font-bold text-blue-300'>Home</u></Link> </i></p>
        <img src={Home} className='m-auto my-14 rounded-3xl w-[650px] h-[400px]'/>
    </div>
  )
}
