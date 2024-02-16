import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';

const LoginForm = () => {
  const { login } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: '',
    password_hash: '',
  });


  let navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      // Redirect to user notes
      navigate("/notes")
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error
    }
  };

  return (
    <div className="sm:w-full lg:w-2/5 m-auto p-1">
      <h2 className='text-2xl text-center py-4'>Login</h2>
      <form onSubmit={handleSubmit} className="bg-slate-100 shadow-md rounded px-10 pt-6 pb-8 mb-4">
        <div className='flex flex-col w-full'>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
                className='shadow bg-transparent appearance-none border rounded py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            <input
                type="password"
                name="password_hash"
                value={formData.password_hash}
                onChange={handleChange}
                placeholder="Password"
                required
                className='shadow bg-transparent appearance-none border rounded py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
        </div>
        <div className='flex justify-center items-center gap-1 bg-green-200 rounded my-4 py-2 font-bold'>
            <button type="submit">Login</button>
        </div>
        <div className='text-center text-xs font-bold hover:underline'>
            <Link to={`/signup`}>Don't have an account yet?</Link>
        </div>
      </form>
    </div>
  );
};

export { LoginForm };
