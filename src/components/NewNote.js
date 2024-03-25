import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext'; // Import UserContext

const API = process.env.REACT_APP_API_URL;

export const NewNote = () => {
    const { userInfo } = useContext(UserContext); // Access user object from context
  const [newNote, setNewNote] = useState({ title: '', note_content: '' });

  let navigate = useNavigate();

  const CreateNewNote = (newNote) => {
    if (!userInfo.token) {
      // Handle authentication error, e.g., redirect to login page or show error message
      console.log(`User not Authenticated: ${userInfo}`);
      console.error("User not authenticated");
      navigate("/login");
      return;
    }
  
    axios
      .post(`${API}/notes`, newNote, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        },
      })
      .then(() => {
        console.log(`User info: ${userInfo}`);
        navigate(`/notes`);
      })
      .catch((error) => {
        console.error("Error creating new note:", error);
        return;
      });
  };

  const handleTextChange = (event) => {
    setNewNote({ ...newNote, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`New note: ${newNote}`);
    CreateNewNote(newNote);
  };

  return (
    <div className="p-4 min-h-96 w-full z-50">
        <h2 className='text-base text-center mb-2'>Create a New Note!</h2>
      <form
        onSubmit={handleSubmit}
        className="w-2/4 m-auto z-50"
      >
        <div className='p-4 bg-purple-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-[#BC13FE] shadow-lg shadow-[#BC13FE]/20'>
          <section>
            <input
              value={newNote.title}
              type="text"
              id="title"
              name='title'
              onChange={handleTextChange}
              placeholder="Type title here..."
              required
              className="rounded px-1 w-full focus:outline-none bg-transparent text-xl font-bold italic mb-4"
            />
          </section>
          <section className='flex'>
            <textarea
              value={newNote.note_content}
              type="text"
              id="note_content"
              name='note_content'
              onChange={handleTextChange}
              placeholder="Type your note here..."
              required
              className="rounded px-1 w-full h-80 focus:outline-none bg-transparent"
            />
          </section>
        </div>
        <section className="flex justify-evenly my-4">
          <button type="submit" className='bg-[#BC13FE] hover:bg-[#7301EC] px-4 py-1 rounded'>Save</button>
          <Link to={`/notes`} className="ml-2">
            <button type="button" className='border border-[#121212] dark:border-[#ececec] hover:bg-[#F79404] hover:border-[#F79404] hover:dark:border-[#F79404] px-2 py-1 rounded'>Cancel</button>
          </Link>
        </section>
      </form>
    </div>
  );
};
