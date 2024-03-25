import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import { RxMoon } from "react-icons/rx";
import { RxSun } from "react-icons/rx";

export const NavBar = ({ darkMode, setDarkMode }) => {
    const { userInfo, logout } = useContext(UserContext);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [profileImageKey, setProfileImageKey] = useState(0);

    const navigate = useNavigate();
    const modalRef = useRef(null);

    const toggleDarkMode = () => {
        setDarkMode(prevDarkMode => !prevDarkMode);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    useEffect(() => {
        const handleClickOutsideModal = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowLogoutModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutsideModal);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideModal);
        };
    }, []);


    // this fixes the issue of profile image not showing or updating right away
    // a key attribute is added to the image element, which forces React to re-render the image when the key changes
    useEffect(() => {
        // Update the key whenever the profile image changes
        setProfileImageKey(prevKey => prevKey + 1);
    }, [userInfo?.user?.profile_img]); // Listen for changes in the profile image URL


    return (
        <div className='flex justify-between p-4 bg-[#ececec] text-[#121212] dark:bg-[#121212] dark:text-[#ffffff] border-b border-dotted border-gray-400 dark:border-gray-700 h-[4em]'>
            <section></section>
            <section className='font-signature'>
                <h1 className='text-3xl'><Link to={`/`}>Inkup</Link></h1>
            </section>
            <section className='flex items-center gap-4'>
                <button
                    onClick={toggleDarkMode}
                    className="p-4 text-[#BC13FE] font-bold"
                >
                    {darkMode ? <RxMoon size={25} /> : <RxSun size={25} />}
                </button>
                {userInfo.token ? (
                    <div className='flex items-center gap-4 relative pr-4'>
                        <img
                            key={profileImageKey}
                            src={userInfo?.user?.profile_img}
                            alt={userInfo?.user?.username}
                            className='object-scale-up w-10 h-10 rounded-full cursor-pointer'
                            onClick={() => setShowLogoutModal(true)}
                        />
                        {showLogoutModal && (
                            <div ref={modalRef} className="absolute right-1.5 top-10 ">
                                <button
                                    className='bg-[#BC13FE] hover:bg-[#7301EC] shadow-lg shadow-[#BC13FE]/50 px-1 py-0.5 rounded'
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <button className='bg-[#BC13FE] hover:bg-[#7301EC] shadow-lg shadow-[#BC13FE]/50 px-2 py-1 rounded'>
                            <Link to="/login">Login</Link>
                        </button>
                    </div>
                )}
            </section>
        </div>
    )
}
