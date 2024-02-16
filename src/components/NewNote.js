import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext'; // Import UserContext

const API = process.env.REACT_APP_API_URL;

export const NewNote = () => {
    const { userInfo, checkAuthentication } = useContext(UserContext); // Access user object from context
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
    <div className="flex justify-center p-1">
      <form
        onSubmit={handleSubmit}
        className="bg-cyan-200 w-1/4 p-4 flex flex-col gap-2 rounded shadow-md"
      >
        <section>
          <input
            value={newNote.title}
            type="text"
            id="title"
            name='title'
            onChange={handleTextChange}
            placeholder="Title"
            required
            className="rounded-sm px-1 w-full"
          />
        </section>
        <section className='flex'>
          <textarea
            value={newNote.note_content}
            type="text"
            id="note_content"
            name='note_content'
            onChange={handleTextChange}
            placeholder="Your note..."
            required
            className="rounded-sm px-1 w-full"
            rows={5}
          />
        </section>
        <section className="flex justify-center">
          <button type="submit">Done</button>
          <Link to={`/notes`} className="ml-2">
            <button type="button">Cancel</button>
          </Link>
        </section>
      </form>
    </div>
  );
};
