import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export const Note = ({note}) => {
  return (
    <div className='bg-cyan-200 p-4 shadow-md rounded md:w-[28%] lg:w-[22%] h-40 mt-3'>
        <Link to={`/notes/${note.id}`}>
            <div className='flex justify-between'>
                <h3 className='font-bold text-md'>{note.title}</h3>
                <span className='text-xs font-semibold italic'>{moment(note.date_created).fromNow()}</span>
            </div>
            <p className='py-5 text-justify line-clamp-[3]'>{note.note_content}</p>
        </Link>
    </div>
  )
}
