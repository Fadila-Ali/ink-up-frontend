import React, { useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import { PiUploadSimpleBold } from "react-icons/pi";

export const SignupForm = () => {
    const { signup } = useContext(UserContext);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        profile_img: 'https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=Profile+Image',
        username: '',
        password_hash: '',
    });


    let navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle file input change separately
    const handleFileChange = (e) => {
        const file = URL.createObjectURL(e.target.files[0]);
        setFormData({ ...formData, profile_img: file });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await signup(formData);
          // Redirect to user notes
          navigate("/profile")
        } catch (error) {
          console.error('Signup error:', error);
          // Handle signup error
        }
      };


  return (
    <div className="sm:w-full lg:w-2/5 m-auto p-1">
        <h2 className='text-2xl text-center py-4'>Register</h2>
        <form onSubmit={handleSubmit} className="bg-slate-100 shadow-md rounded px-10 pt-6 pb-8 mb-4">
            <img src={formData.profile_img} className='object-cover w-[100px] h-[100px] shadow mb-2 m-auto rounded-full'/>
            <div className='flex w-full'>
                <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                    className='shadow bg-transparent appearance-none border rounded py-2 px-3 mr-4 mb-4 w-1/2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
                <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                    className='shadow bg-transparent appearance-none border rounded py-2 px-3 mb-4 w-1/2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
            </div>
            <div className='flex gap-4 w-full'>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className='shadow bg-transparent appearance-none border rounded py-2 px-3 w-1/2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    className='shadow bg-transparent appearance-none border rounded py-2 px-3 w-1/2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
            </div>
            <div className='flex gap-4'>
                <input
                    type="password"
                    name="password_hash"
                    value={formData.password_hash}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className='shadow bg-transparent appearance-none border rounded py-2 px-3 mt-4 w-1/2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
                    <input
                        type="file"
                        name="profile_img"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="inputfile"
                    />
                    <label><PiUploadSimpleBold className='inline m-auto' /> Profile Image</label>
            </div>
            <div className='flex justify-center items-center gap-1 bg-green-200 rounded my-4 py-2 font-bold'>
                <button type="submit">Sign Up</button>
            </div>
            <div className='text-center text-xs font-bold hover:underline'>
                <Link to={`/login`}>Already have an account?</Link>
            </div>
        </form>
    </div>
  )
}
