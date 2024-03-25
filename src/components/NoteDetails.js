import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { UserContext } from '../contexts/userContext';
import { TiEdit } from "react-icons/ti";
import { FaRegTrashCan } from "react-icons/fa6";
import { TbArrowBackUp } from "react-icons/tb";


const API = process.env.REACT_APP_API_URL;

export const NoteDetails = () => {
    const { userInfo } = useContext(UserContext);
    // state for individual note
    const [note, setNote] = useState({});
    // state to track changes in individual note
    const [editedNote, setEditedNote] = useState({ title: "", note_content: ""});
    const [isEditing, setIsEditing] = useState(false);


    // id of the individual note the user will click on
    const { id } = useParams();
    let navigate = useNavigate();

    // fetching data to display the individual note the user clicked on
    useEffect(() => {
        if (!userInfo?.token) {
            // Handle authentication error, e.g., redirect to login page or show error message
            console.log(`User not Authenticated: ${userInfo}`);
            console.error("User not authenticated");
            return;
          }
        axios
          .get(`${API}/notes/${id}`, {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`, // check if user is authenticated
            },
          })
          .then((res) => {
            setNote(res.data);
            // Initialize editedNote with current values when entering editing mode
            setEditedNote({ title: res.data.title, note_content: res.data.note_content });
          })
          .catch((c) => {
            console.warn("catch", c);
          });
      }, [id, userInfo.token]);

      // fetching data to put changes made on note by user and updating the database
      const updatingNote = (updatedNote, id) => {
        axios
          .put(`${API}/notes/${id}`, updatedNote, {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`, // check if user is authenticated
            },
          })
          .then((res) => {
                // Reload the data after updating the note
                setNote(res.data);
                setIsEditing(false); // Exit editing mode after successfully updating the note
          })
          .catch((error) => {
            console.log("Error updating note:", error);
          });
      };

      // function deletes note from database
    const handleDelete = () => {
        if (
        window.confirm("Are you sure you want to permanently delete this note?")
        ) {
        axios
            .delete(`${API}/notes/${id}`, {
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`,
                },
            })
            .then(() => navigate("/notes"))
            .catch((c) => console.warn("catch, c"));
        }
    };


  return (
    <article className='p-4 min-h-96 w-[60%] rounded border border-dotted border-slate-400 bg-slate-50'>
            <div className='flex justify-between gap-4 pb-4 border-b border-[#181919]'>
                <Link to={`/notes`}>
                    <button><TbArrowBackUp size={25} /></button>
                </Link>
                {isEditing ? (
                    <div className='flex gap-4'>
                        <button onClick={() => setIsEditing(false)} className='border border-[#181919] hover:bg-slate-200 px-2 py-1 rounded'>Cancel</button>
                        <button onClick={() => updatingNote(editedNote, id)} className='bg-[#04d9ff] border border-[#04d9ff] hover:opacity-70 px-2 py-1 rounded'>Save changes</button>
                    </div>
                ) : (
                    <div className='flex gap-4'>
                        <button onClick={() => setIsEditing(true)}><TiEdit size={25}/></button>
                        <button onClick={handleDelete}><FaRegTrashCan size={20}/></button>
                    </div>
                )}
            </div>
            {isEditing ? (
                <article className='flex flex-col gap-4 pt-4'>
                    <section>
                        <input
                            type='text'
                            value={editedNote.title}
                            onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
                            className='rounded-sm px-1 w-full shadow focus:outline-none'
                        />
                    </section>
                    <section>
                        <textarea
                            type='text'
                            value={editedNote.note_content}
                            onChange={(e) => setEditedNote({ ...editedNote, note_content: e.target.value })}
                            className='rounded-sm px-1 w-full shadow focus:outline-none'
                            rows={6}
                        />
                    </section>
                </article>
            ) : (
                <section className='px-2 py-4'>
                    <span className='text-xs font-semibold italic'>Created: {moment(note.date_created).fromNow()}</span>
                    <div className='flex flex-col py-2'>
                        <h3 className='font-bold text-md'>{note.title}</h3>
                        <p className='pb-4 text-justify line-clamp-[3]'>{note.note_content}</p>
                    </div>
                </section>
            )}    
    </article>
  )
}
