import React, { useEffect } from 'react';
import moment from 'moment';
import { IoMdCloseCircle } from "react-icons/io";
import { FaTrashCan } from "react-icons/fa6";
import { BiSolidEditAlt } from "react-icons/bi";

export const ViewTask = ({ task, setShowTaskDetails }) => {

    // formatting the due date
    const getDueDate = (dueDate) => {
        const today = moment().startOf('day');
        const due = moment(dueDate).startOf('day');

        if (due.isSame(today, 'day')) {
            return 'today';
        } else if (due.isSame(today.clone().subtract(1, 'days'), 'day')) {
            return 'yesterday';
        } else {
            return due.format('MM/DD/YYYY');
        }
    };

    // getting status of the task based on the due date and whether it is completed or not
    const getStatus = (dueDate, completionDate) => {
        const today = moment().startOf('day');
        const due = moment(dueDate).startOf('day');
    
        if (!completionDate) {
            if (due.isSameOrAfter(today)) {
                return 'pending';
            } else {
                return 'overdue';
            }
        } else {
            return 'completed';
        }
    };
    
    // style the priority level
    const getPriorityColor = (priorityLevel) => {
        switch (priorityLevel.toLowerCase()) {
            case 'low':
                return 'text-green-500';
            case 'medium':
                return 'text-yellow-500';
            case 'high':
                return 'text-red-500';
            default:
                return '';
        }
    };    
    
    return (
        <article className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[35rem] min-h-40 bg-purple-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border-2 border-[#BC13FE] overflow-hidden shadow-xl transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-4 shadow-[#BC13FE]/50'>
            <div className='flex justify-between items-center mb-4'>
                <p className='text-xs italic font-semibold'>created {moment(task.created_at).fromNow()}</p>
                <button onClick={() => setShowTaskDetails(false)}><IoMdCloseCircle size={20} /></button>
            </div>
            <h3 className='font-bold italic text-xl text-center placeholder-[#BB86FC]/40 bg-transparent'>{task.name}</h3>
            <div>
                <p>due: <span className='text-sm'>{getDueDate(task.due_date)}</span></p>
                <p>priority: <span className='text-sm'>{task.priority_level}</span></p>
                <p>repeat: <span className='text-sm'>{task.repeat_interval !== '' ? task.repeat_interval : 'no'}</span></p>
                <p>status: <span className='text-sm'>{getStatus(task.due_date, task.completion_date)}</span></p>
                <p>completion date: <span className='text-sm'>{task.completion_date ? moment(task.completion_date).format('MM/DD/YYYY') : 'Not completed yet'}</span></p>
            </div>
            <div className='flex justify-evenly items-center p-2 mt-2 text-sm'>
                <button className='flex items-center gap-1'><FaTrashCan />delete</button>
                <button className='flex items-center gap-1'><BiSolidEditAlt />edit</button>
            </div>
        </article>
    );
};
