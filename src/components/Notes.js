import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { UserContext } from '../contexts/userContext';
import { Note } from './Note';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Search } from './Search';
import { Filters } from './Filters';
const API = process.env.REACT_APP_API_URL;

export const Notes = () => {
    const { userInfo } = useContext(UserContext); // Access user object from context
    const [notes, setNotes] = useState([]); // notes array || may be filtered
    const [originalNotes, setOriginalNotes] = useState([]); // get original notes || unfiltered
    const [currentPage, setCurrentPage] = useState(1); // current page default to 1
    const numberOfNotesPerPage = 10; // number of notes to display per page

    useEffect(() => {
        if (!userInfo?.token) {
            // Handle authentication error, e.g., redirect to login page or show error message
            console.log(`User not Authenticated: ${userInfo}`);
            console.error("User not authenticated");
            return;
        }
        
        axios
            .get(`${API}/notes`, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }) // Fetch notes associated with the logged-in user
            .then((res) => {
                console.log(`Notes array: ${res.data}`);
                // Sort the notes based on date_created in descending order
                const sortedNotes = res.data.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));
                setNotes(sortedNotes);
                setOriginalNotes(sortedNotes); // Save original unfiltered notes
            })
            .catch((c) => console.warn("catch", c));
    }, [userInfo]);

    // Get number of pages based on number of user notes
    const totalPages = Math.ceil(notes.length / numberOfNotesPerPage);

    // Pagination function
    const handlePageChange = (num) => {
        setCurrentPage(num);
    };

    // Current notes to display
    const indexOfLastNote = currentPage * numberOfNotesPerPage;
    const indexOfFirstNote = indexOfLastNote - numberOfNotesPerPage;
    const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);


    // Group notes by their created date
    const groupedNotes = currentNotes.reduce((acc, note) => {
        let dateCreated = '';
        const today = moment().startOf('day');
        const yesterday = moment().subtract(1, 'days').startOf('day');
        const lastWeek = moment().subtract(1, 'weeks').startOf('day');
        const monthStart = moment().startOf('month');
        const yearStart = moment().startOf('year');
        
        if (moment(note.date_created).isSame(today, 'day')) {
            dateCreated = 'Today';
        } else if (moment(note.date_created).isSame(yesterday, 'day')) {
            dateCreated = 'Yesterday';
        } else if (moment(note.date_created).isAfter(lastWeek)) {
            dateCreated = 'Last Week';
        } else if (moment(note.date_created).isSame(monthStart, 'month')) {
            dateCreated = moment(note.date_created).format('MMMM YYYY');
        } else if (moment(note.date_created).isSame(yearStart, 'year')) {
            dateCreated = moment(note.date_created).format('YYYY');
        }

        acc[dateCreated] = [...(acc[dateCreated] || []), note];
        return acc;
    }, {});


    return (
        <div className='p-4 flex justify-between gap-6 w-full'>
            <section className='w-2/3'>
                {userInfo && userInfo.user && userInfo.user.username && (
                    <h2 className='text-xl'>{userInfo.user.username.charAt(0).toUpperCase() + userInfo.user.username.substring(1)}, you have {originalNotes.length} notes!</h2>
                )}
                {/* Render user notes */}
                <article className='p-4 h-[30rem] overflow-y-auto scrollbar-hide rounded border border-dotted border-gray-400 dark:border-gray-700'>
                    <div className='bg-[#BC13FE] rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-15 border border-[#BC13FE] hover:bg-[#BC13FE] shadow-lg shadow-[#BC13FE]/25 p-4 w-full mb-6 h-10 flex justify-center items-center text-sm font-bold'>
                        <Link to={`/newnote`}>
                            <AiOutlinePlusCircle size={20} className='inline mx-1 mb-2 mt-1'/>
                            New Note
                        </Link>
                    </div>
                    {Object.entries(groupedNotes).map(([date_created, notes]) => (
                        <div key={date_created} className="mb-6 mx-2">
                            <h3 className="text-xs italic">{date_created}</h3>
                            <div className="border-b border-gray-400 dark:border-gray-700 my-2"></div>
                            {notes.map((note) => (
                                <Note key={note.id} note={note} />
                            ))}
                        </div>
                    ))}
                </article>
                {/* Pagination section */}
                <section className='flex flex-col justify-center items-center gap-2'>
                    <div>
                        {notes.length === 0 ? (
                            <p>Showing 0 results</p>
                        ) : (
                            <p className="text-sm text-gray-700 pt-2">
                                Showing ({indexOfFirstNote + 1} to {Math.min(indexOfLastNote, notes.length)}) of {notes.length} results
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
                                                currentPage === index + 1 ? "bg-[#BC13FE] text-white" : "text-gray-900 dark:text-gray-100"
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
                                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-[#7301EC] focus:z-20 focus:outline-offset-0"
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
            <section className='border border-dotted border-gray-400 dark:border-gray-700 w-1/3 p-4 mt-7 rounded-md h-[30rem] overflow-y-auto scrollbar-hide'>
                {/* Searching functionality here */}
                <Search currentNotes={currentNotes} />
                {/* filter and edit notes here */}
                <Filters currentNotes={currentNotes} setNotes={setNotes} originalNotes={originalNotes} />
            </section>
        </div>
    );
};
