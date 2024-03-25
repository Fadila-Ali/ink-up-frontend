import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { IoMdMore } from "react-icons/io";
import { BsFillBookmarkFill } from "react-icons/bs";

export const Note = ({note}) => {
  return (
    <div className='border-b border-gray-400 dark:border-gray-700 p-2 w-full h-12 mb-2 hover:scale-[0.99] duration-200 pl-4'>
        <Link to={`/notes/${note.id}`} className='flex justify-between items-center'>
            <div className='flex'>
              <BsFillBookmarkFill size={18} />
              <h3 className='text-md font-bold px-6'>{note.title.charAt(0).toUpperCase() + note.title.substring(1)}</h3>
            </div>
            <div className='flex gap-2'>
              <span className='text-xs italic font-semibold text-end'>{moment(note.date_created).fromNow()}</span>
                <Link to={`/notes/${note.id}`}>
                  <IoMdMore />
                </Link>
            </div>
        </Link>
    </div>
  )
}
