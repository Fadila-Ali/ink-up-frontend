import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { UserContext } from '../contexts/userContext';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Task } from "./Task";
import { Search } from './Search';
import { Filters } from './Filters';
import { NewTask } from './NewTask';
const API = process.env.REACT_APP_API_URL;

export const Tasks = () => {
    const { userInfo, error } = useContext(UserContext); // Access user object from context
    const [tasks, setTasks] = useState([]); // tasks array || may be filtered
    const [originalTasks, setOriginalTasks] = useState([]); // get original tasks || unfiltered
    const [currentPage, setCurrentPage] = useState(1); // current page default to 1
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const numberOfTasksPerPage = 10; // number of tasks to display per page

    let navigate = useNavigate();

    useEffect(() => {
        if (!userInfo?.token) {
            // Handle authentication error, e.g., redirect to login page or show error message
            console.log(`User not Authenticated: ${userInfo}`);
            console.error("User not authenticated");
            setErrorMessage(true)
        }
        
        axios
            .get(`${API}/tasks`, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }) // Fetch tasks associated with the logged-in user
            .then((res) => {
                console.log(`Tasks array: ${res.data}`);
                // Sort the tasks based on date_created in descending order
                const sortedTasks = res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setTasks(sortedTasks);
                setOriginalTasks(sortedTasks); // Save original unfiltered tasks
            })
            .catch((c) => console.warn("catch", c));
    }, [userInfo]);


    // Get number of pages based on number of user tasks
    const totalPages = Math.ceil(tasks.length / numberOfTasksPerPage);

    // Pagination function
    const handlePageChange = (num) => {
        setCurrentPage(num);
    };

    // Open modal function
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Close modal function
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Current tasks to display
    const indexOfLastNote = currentPage * numberOfTasksPerPage;
    const indexOfFirstNote = indexOfLastNote - numberOfTasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstNote, indexOfLastNote);

    // Group tasks by their created_at date
    const groupedTasks = currentTasks.reduce((acc, task) => {
        let createdAt = '';
        const today = moment().startOf('day');
        const yesterday = moment().subtract(1, 'days').startOf('day');
        const lastWeek = moment().subtract(1, 'weeks').startOf('day');
        const monthStart = moment().startOf('month');
        const yearStart = moment().startOf('year');
        
        if (moment(task.created_at).isSame(today, 'day')) {
            createdAt = 'Today';
        } else if (moment(task.created_at).isSame(yesterday, 'day')) {
            createdAt = 'Yesterday';
        } else if (moment(task.created_at).isAfter(lastWeek)) {
            createdAt = 'Last Week';
        } else if (moment(task.created_at).isSame(monthStart, 'month')) {
            createdAt = moment(task.created_at).format('MMMM YYYY');
        } else if (moment(task.created_at).isSame(yearStart, 'year')) {
            createdAt = moment(task.created_at).format('YYYY');
        }

        acc[createdAt] = [...(acc[createdAt] || []), task];
        return acc;
    }, {});


    return (
        <div className='p-4 flex justify-between gap-6 w-full'>
            <section className='w-2/3'>
                {userInfo && userInfo.user && userInfo.user.username && (
                    <h2 className='text-base'>{userInfo.user.firstname.charAt(0).toUpperCase() + userInfo.user.firstname.substring(1)}, you have {originalTasks.length} tasks!</h2>
                )}
                {/* Render user tasks */}
                <article className='p-6 h-[30rem] overflow-y-auto scrollbar-hide rounded border border-dotted border-gray-400 dark:border-gray-700'>
                    <div className='bg-[#BC13FE] rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-15 border-2 border-[#BC13FE] hover:bg-[#BC13FE] shadow-lg shadow-[#BC13FE]/25 p-4 w-full mb-6 h-10 flex justify-center items-center text-sm font-bold'>
                        {/* Open modal when clicking on 'New task' */}
                        <button onClick={openModal}>
                            <AiOutlinePlusCircle size={20} className='inline mx-1 mb-2 mt-1'/>
                            New task
                        </button>
                    </div>
                    {isModalOpen && <NewTask closeModal={closeModal} setTasks={setTasks} setOriginalTasks={setOriginalTasks} />}
                    {Object.entries(groupedTasks).map(([createdAt, tasks]) => (
                        <div key={createdAt} className="mb-6 mx-2">
                            <h3 className="text-xs italic">{createdAt}</h3>
                            <div className="border-b border-gray-400 dark:border-gray-700 my-2"></div>
                            {tasks.map((task) => (
                                <Task key={task.id} task={task} />
                            ))}
                        </div>
                    ))}
                </article>
                {/* Error when user is not authenticated */}
                {errorMessage && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold mb-4 text-gray-900">{error}</h2>
                            <p className="text-gray-700 mb-4">Please log in again to continue.</p>
                            <Link to={`/login`} className="bg-[#BC13FE] border border-[#BC13FE] hover:bg-[#7301EC] px-4 py-1 rounded">Log In</Link>
                        </div>
                    </div>
                )}
                {/* Pagination section */}
                <section className='flex flex-col justify-center items-center gap-2'>
                    <div>
                        {tasks.length === 0 ? (
                            <p>Showing 0 results</p>
                        ) : (
                            <p className="text-sm text-gray-500 pt-2">
                                Showing ({indexOfFirstNote + 1} to {Math.min(indexOfLastNote, tasks.length)}) of {tasks.length} results
                            </p>
                        )}
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            {/* Previous page button */}
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-[#121212] hover:dark:bg-[#ececec] focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Previous</span>
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            {/* Render pagination links */}
                            {Array.from({ length: totalPages }, (_, index) => {
                                // Determine whether to render the current pagination link
                                const renderLink =
                                    totalPages <= 6 || // Render all pages if total pages is 6 or fewer
                                    (index < 3 || index > totalPages - 4) || // Render the first 3 and last 3 pages
                                    (currentPage >= 3 && currentPage <= totalPages - 2 && Math.abs(currentPage - index) <= 1); // Render the current page and two adjacent pages if current page is in the middle
                                // Render ellipsis if applicable
                                const renderEllipsis = index === 3 || index === totalPages - 4;

                                if (renderLink) {
                                    return (
                                        <button
                                            key={index + 1}
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                                currentPage === index + 1 ? "bg-[#BC13FE] text-white" : "text-gray-700 dark:text-gray-100"
                                            } ring-1 ring-inset ring-gray-300 hover:bg-[#7301EC] focus:z-20 focus:outline-offset-0`}
                                        >
                                            {index + 1}
                                        </button>
                                    );
                                } else if (renderEllipsis) {
                                    return (
                                        <span
                                            key={index}
                                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-100 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                                        >
                                            ...
                                        </span>
                                    );
                                }
                                return null;
                            })}
                            {/* Next page button */}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-100 ring-1 ring-inset ring-gray-300 hover:bg-[#7301EC] focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Next</span>
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </nav>
                    </div>
                </section>
            </section>
            <section className='border border-dotted border-gray-400 dark:border-gray-700 w-1/3 p-4 mt-6 rounded-md h-[30rem] overflow-y-auto scrollbar-hide'>
                {/* Searching functionality here */}
                {/* <Search currentTasks={currentTasks} /> */}
                {/* filter and edit tasks here */}
                {/* <Filters currentTasks={currentTasks} setTasks={setTasks} originalTasks={originalTasks} /> */}
            </section>
        </div>
    );
};
