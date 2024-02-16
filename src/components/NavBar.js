import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';


export const NavBar = () => {
    const { userInfo, logout } = useContext(UserContext);

  return (
    <div className='flex justify-between p-4 bg-slate-800 text-white h-[4em]'>
        <section></section>
        <section className=''>
            <h1 className='font-bold text-3xl italic'><Link to={`/`}>InkUp</Link></h1>
        </section>
        <section>
            {userInfo.token ? (
            <button className='border px-2 mr-2 rounded-sm' onClick={logout}>Logout</button>
            ) : (
            <button className='border px-2 mr-2 rounded-sm'><Link to="/login">Login</Link></button>
            )}
        </section>
    </div>
  )
}
