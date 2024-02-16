import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className=''>
        <h1 className='text-5xl text-center '>Welcome to InkUp!!!</h1>
        <Link to={`/signup`}>
            <button>Sign up</button>
        </Link>
        <Link to={`/login`}>
            <button>Login</button>
        </Link>
    </div>
  )
}
