import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/userContext';
import { HiOutlinePencil } from "react-icons/hi2";

export const Profile = () => {
    const { user, updateUser } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        profile_img: '',
        username: '',
        password_hash: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                firstname: user.firstname || '',
                lastname: user.lastname || '',
                email: user.email || '',
                profile_img: user.profile_img || '',
                username: user.username || '',
                password_hash: user.password_hash || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            await updateUser(formData);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            // Handle update error
        }
    };

    const handleFileChange = (e) => {
        const file = URL.createObjectURL(e.target.files[0]);
        setFormData({ ...formData, profile_img: file });
    };

    return (
        <div className='flex flex-col items-center p-4 w-2/3'>
            {isEditing ? (
                <form className='w-full'>
                    <h2 className='text-2xl py-1'>Editing Profile Page</h2>
                    <div className='flex gap-4 bg-slate-100 shadow-md p-4 my-2 rounded'>
                        <img src={formData.profile_img} alt={`${formData.firstname}' profile image`} className='object-cover w-[150px] h-[150px] shadow rounded-full'/>
                        <div>
                            <div className='flex w-full'>
                                <input
                                    type="text"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    required
                                    className='shadow bg-transparent appearance-none border rounded py-2 px-3 mr-4 mb-4 w-1/2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                />
                                <input
                                    type="text"
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    required
                                    className='shadow bg-transparent appearance-none border rounded py-2 px-3 mb-4 w-1/2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                />
                            </div>
                            <div className='flex flex-col gap-4'>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Username"
                                    required
                                    className='shadow bg-transparent appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className='shadow bg-transparent appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                />
                            </div>
                            <div className='flex gap-4'>
                                <input
                                    type="file"
                                    name="profile_img"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className='shadow bg-transparent appearance-none border rounded py-2 px-3 mt-4 w-1/2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                />
                                <input
                                    type="password"
                                    name="password_hash"
                                    value={formData.password_hash}
                                    onChange={handleChange}
                                    placeholder='********'
                                    required
                                    className='shadow bg-transparent appearance-none border rounded py-2 px-3 mt-4 w-1/2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center items-center gap-1 bg-green-200 rounded'>
                        <button onClick={handleSave}>Save</button>
                    </div>
                </form>
            ) : (
                <section className='w-full'>
                    <h2 className='text-2xl py-1'>Profile Page</h2>
                    <div className='flex gap-4 bg-slate-100 shadow-md p-4 my-2 rounded'>
                        <img src={formData.profile_img} alt={`${formData.firstname}' profile image`} className='object-cover w-[200px] h-[200px] rounded'></img>
                        <div>
                            <h3 className='text-3xl'><span>{formData.firstname}</span> <span>{formData.lastname}</span></h3>
                            <h4 className='text-sm font-bold'>@{formData.username}</h4>
                            <h3>Email: <span>{formData.email}</span></h3>
                        </div>
                    </div>
                    <div className='flex justify-center items-center gap-1 bg-green-200 rounded'>
                        <button onClick={handleEdit}>edit profile</button><span><HiOutlinePencil /></span>
                    </div>
            </section>
            )}
        </div>
    );
};
