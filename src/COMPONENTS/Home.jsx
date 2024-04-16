import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className='m-auto text-center w-full '>
        <div className='border rounded-md w-[350px] hover:scale-[1.1] duration-500 m-auto my-[33%] lg:my-[16.3%] py-5'>
        <h1 className='text-3xl font-semibold'>Login as </h1>
        {/*Redirecting to component */}
        <Link to={"/admin"}>
            <button className='border p-2 m-2 w-[100px] text-lg font-semibold hover:bg-white hover:text-black'>Admin</button>
        </Link>
        <Link to={"/team"}>
            <button className='border p-2 m-2 w-[100px] text-lg font-semibold hover:bg-white hover:text-black'>Team</button>
        </Link>
        </div>
    </div>
  )
}
