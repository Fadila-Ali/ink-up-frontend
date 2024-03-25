import React, { useEffect, useContext, useRef, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { UserContext } from '../contexts/userContext';
import { IoMdMore } from "react-icons/io";
import { IoCheckmarkCircle } from "react-icons/io5";
import { ViewTask } from './ViewTask';

const API = process.env.REACT_APP_API_URL;

export const Task = ({ task }) => {
    // contains user data
    const { userInfo } = useContext(UserContext);
    // this manages the modal that pops out when the user clicks the more icon
    const [showMore, setShowMore] = useState(false);
    // this manages the modal that pops out when the user clicks the view option
    const [showTaskDetails, setShowTaskDetails] = useState(false);

    // track the 'more' icon
    const moreRef = useRef(null);
    // track the 'view' modal
    const viewModalRef = useRef(null);

    useEffect(() => {
        const handleClickOutsideMoreModal = (event) => {
            if (moreRef.current && !moreRef.current.contains(event.target)) {
                setShowMore(false);
            }
        };

        const handleClickOutsideViewModal = (event) => {
            if (viewModalRef.current && !viewModalRef.current.contains(event.target)) {
                setShowTaskDetails(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutsideMoreModal);
        document.addEventListener('mousedown', handleClickOutsideViewModal);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideMoreModal);
            document.removeEventListener('mousedown', handleClickOutsideViewModal);
        };
    }, []);

    // function to toggle task details modal
    const handleViewModal = () => {
        // Close the more options modal when opening the task details modal
        setShowMore(false);
        setShowTaskDetails(true);
    }

    // function deletes task from database
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to permanently delete this note?")) {
            axios
                .delete(`${API}/tasks/${task.id}`, {
                    headers: {
                        'Authorization': `Bearer ${userInfo.token}`,
                    },
                })
                .then(() => {
                    // Reload the /tasks page
                    window.location.reload();
                })
                .catch((error) => console.warn("Error deleting task:", error));
        }
    };

    return (
        <div className='border-b border-gray-400 dark:border-gray-700 p-2 w-full h-12 mb-2 pl-4'>
            <section className='flex justify-between items-center relative'>
                <div className='flex z-10'>
                    <button className='hover:scale-[0.99] duration-300'><IoCheckmarkCircle size={20} /></button>
                    <h3 className='text-md font-bold px-6'>{task.name.charAt(0).toUpperCase() + task.name.substring(1)}</h3>
                </div>
                {!showMore && (
                    <button onClick={() => setShowMore(!showMore)} ref={moreRef} className='bg-gray-300 dark:bg-gray-700 rounded-lg relative'><IoMdMore /></button>
                )}
                {showMore && (
                    <div className="absolute right-[-8px] bg-[#ececec] dark:bg-[#121212]" ref={viewModalRef}>
                        <ul className="text-[11px] p-[3px] border border-gray-400 dark:border-gray-700 flex flex-col justify-center items-center font-bold rounded-e">
                            <li className='hover:opacity-70'>
                                <button onClick={handleViewModal}>view</button>
                            </li>
                            <li className='hover:opacity-70'>
                                <button onClick={() => setShowMore(false)}>edit</button>
                            </li>
                            <li className='hover:opacity-70'>
                                <button onClick={() => { handleDelete(); setShowMore(false); }}>delete</button>
                            </li>
                        </ul>
                    </div>
                )}
                {showTaskDetails && <ViewTask task={task} setShowTaskDetails={setShowTaskDetails} />}
            </section>
        </div>
    );
};
