import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className=''>
        <h1 className='text-5xl text-center '>Welcome to InkUp!!!</h1>
        <Link to={`/signup`}>
            <button className='bg-[#EC008C] hover:bg-opacity-5 border border-[#EC008C] hover:border-opacity-5 px-4 py-1 my-4 rounded'>Sign up</button>
        </Link>
        <Link to={`/login`}>
            <button className='hover:bg-[#EC008C] border border-[#EC008C] px-4 py-1 my-4 rounded'>Login</button>
        </Link>
    </div>
  )
}
