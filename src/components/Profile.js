import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/userContext';
import { HiOutlinePencil } from "react-icons/hi2";

export const Profile = () => {
    const { userInfo, updateUser } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        profile_img: '',
        profile_img_file: null, // New state to store file object
        username: '',
        password_hash: ''
    });
    const [profileImageKey, setProfileImageKey] = useState(0);

    useEffect(() => {
        if (userInfo && userInfo.user) {
            setFormData({
                firstname: userInfo.user.firstname || '',
                lastname: userInfo.user.lastname || '',
                email: userInfo.user.email || '',
                profile_img: userInfo.user.profile_img || '',
                username: userInfo.user.username || '',
                password_hash: userInfo.user.password_hash || ''
            });
        }
    }, [userInfo]);


    // this fixes the issue of profile image not showing or updating right away
    // a key attribute is added to the image element, which forces React to re-render the image when the key changes
    useEffect(() => {
        // Update the key whenever the profile image changes
        setProfileImageKey(prevKey => prevKey + 1);
    }, [userInfo.user.profile_img]); // Listen for changes in the profile image URL


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            // Check if profile_img_file exists, if it does, use it for uploading
            const updatedFormData = { ...formData };
            if (formData.profile_img_file) {
                updatedFormData.profile_img = URL.createObjectURL(formData.profile_img_file);
            }
            await updateUser(updatedFormData);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            // Handle update error
        }
    };

    const handleFileChange = (e) => {
        // Check if a file is uploaded
        if (e.target.files && e.target.files[0]) {
            setFormData({
                ...formData,
                profile_img_file: e.target.files[0], // Store file object
                profile_img: URL.createObjectURL(e.target.files[0]) // Display image preview
            });
        }
    };

    return (
        <div className='flex flex-col items-center p-4 w-2/3'>
            {isEditing ? (
                <form className='w-full'>
                    <h2 className='text-2xl py-1'>Editing Profile Page</h2>
                    <div className='flex gap-4 bg-[#ececec] shadow-md p-4 my-2 rounded'>
                        <img key={profileImageKey} src={formData.profile_img} alt={formData.firstname} className='object-cover w-[150px] h-[150px] shadow rounded-full'/>
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
                                    name="profile_img_file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className='shadow bg-transparent appearance-none border rounded py-2 px-3 mt-4 w-1/2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                />
                                <input
                                    type="text"
                                    name="profile_img"
                                    value={formData.profile_img}
                                    onChange={handleChange}
                                    placeholder="Profile Image URL"
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
                <section className='w-full min-h-[30rem] border border-dotted border-slate-400 rounded p-4'>
                    <h2 className='text-lg py-1'>Profile Page</h2>
                    <div className='flex gap-4 bg-[#ececec] shadow-md p-4 my-2 rounded'>
                        {userInfo && userInfo.user && (
                            <>
                                <img key={profileImageKey} src={userInfo.user.profile_img} alt={userInfo.user.firstname} className='object-cover w-[200px] h-[200px] rounded'></img>
                                <div>
                                    <h3 className='text-3xl'><span>{userInfo.user.firstname}</span> <span>{userInfo.user.lastname}</span></h3>
                                    <h4 className='text-sm font-bold'>@{userInfo.user.username}</h4>
                                    <h3>Email: <span>{userInfo.user.email}</span></h3>
                                </div>
                            </>
                        )}
                    </div>
                    <div className='flex justify-center items-center gap-1 bg-[#04d9ff] rounded'>
                        <button onClick={handleEdit}>edit profile</button><span><HiOutlinePencil /></span>
                    </div>
            </section>
            )}
        </div>
    );
};
