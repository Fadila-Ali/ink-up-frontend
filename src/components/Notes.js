import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TbPencilPlus } from "react-icons/tb";
import { UserContext } from '../contexts/userContext'; // Import UserContext
import { Note } from './Note';

const API = process.env.REACT_APP_API_URL;

export const Notes = () => {
    const { userInfo } = useContext(UserContext); // Access user object from context
    const [notes, setNotes] = useState([]);

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
        })
        .catch((c) => console.warn("catch", c));
    }, [userInfo]);

    return (
        <div className='sm:flex flex-wrap gap-3 p-2'>
            <h2>Welcome back {userInfo?.user?.username}!</h2>
            <article className='sm:flex flex-wrap gap-3 p-2'>
                <article className='bg-cyan-200 p-4 shadow-md rounded md:w-[28%] lg:w-[22%] mt-3 h-40 flex justify-center items-center'>
                    <Link to={`/newnote`}>
                        <TbPencilPlus size={40}/>
                    </Link>
                </article>
                {notes.map((note) => {
                    return <Note key={note.id} note={note} />
                })}
            </article>
        </div>
    );
};
