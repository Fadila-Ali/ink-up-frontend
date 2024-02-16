import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { TiEdit } from "react-icons/ti";
import { FaRegTrashCan } from "react-icons/fa6";


const API = process.env.REACT_APP_API_URL;

export const NoteDetails = () => {
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
        axios
          .get(`${API}/notes/${id}`)
          .then((res) => {
            setNote(res.data);
            // Initialize editedNote with current values when entering editing mode
            setEditedNote({ title: res.data.title, note_content: res.data.note_content });
          })
          .catch((c) => {
            console.warn("catch", c);
          });
      }, [id]);

      // fetching data to put changes made on note by user and updating the database
      const updatingNote = (updatedNote, id) => {
        axios
          .put(`${API}/notes/${id}`, updatedNote)
          .then(() => {
            // Assuming you want to reload the data after updating the note
            axios
              .get(`${API}/notes/${id}`)
              .then((res) => {
                setNote(res.data);
                setIsEditing(false); // Exit editing mode after successfully updating the note
              })
              .catch((c) => console.warn("catch", c));
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
            .delete(`${API}/notes/${id}`)
            .then(() => navigate("/notes"))
            .catch((c) => console.warn("catch, c"));
        }
    };


  return (
    <article className='bg-cyan-200 p-4 shadow-md rounded w-1/3 min-h-44 m-auto'>
            <div className='flex justify-between gap-4'>
                {isEditing ? (
                    <>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                        <button onClick={() => updatingNote(editedNote, id)}>Save Changes</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)}><TiEdit size={25}/></button>
                        <button onClick={handleDelete}><FaRegTrashCan size={20}/></button>
                    </>
                )}
                <div className=''>
                    <span className='text-xs flex justify-end font-semibold italic'>Created: {moment(note.date_created).fromNow()}</span>
                </div>
            </div>
            {isEditing ? (
                <article className='flex flex-col gap-4 pt-4'>
                    <section>
                        <input
                            type='text'
                            value={editedNote.title}
                            onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
                            className='rounded-sm px-1 w-full'
                        />
                    </section>
                    <section>
                        <textarea
                            type='text'
                            value={editedNote.note_content}
                            onChange={(e) => setEditedNote({ ...editedNote, note_content: e.target.value })}
                            className='rounded-sm px-1 w-full'
                            rows={5}
                        />
                    </section>
                </article>
            ) : (
                <section>
                    <h3 className='font-bold text-md'>{note.title}</h3>
                    <p className='py-5 text-justify line-clamp-[3]'>{note.note_content}</p>
                </section>
            )}    
    </article>
  )
}
