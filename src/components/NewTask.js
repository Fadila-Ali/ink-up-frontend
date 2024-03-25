import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext'; // Import UserContext
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";

const API = process.env.REACT_APP_API_URL;

export const NewTask = ({ closeModal, setTasks, setOriginalTasks }) => {
    const { userInfo } = useContext(UserContext); // Access user object from context
    const [newTask, setNewTask] = useState({ name: '', due_date: '', priority_level: '', repeat_interval: '' });

    let navigate = useNavigate();

    const CreateNewTask = (newTask) => {
        if (!userInfo.token) {
            // Handle authentication error, e.g., redirect to login page or show error message
            console.log(`User not Authenticated: ${userInfo}`);
            console.error("User not authenticated");
            navigate("/login");
            return;
        }

        axios
            .post(`${API}/tasks`, newTask, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                },
            })
            .then(() => {
                console.log(`User info: ${userInfo}`);
                navigate(`/tasks`);
                // Reload the /tasks page
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error creating new task:", error);
                return;
            });
    };

    const handleTextChange = (event) => {
        setNewTask({ ...newTask, [event.target.id]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(`New Task: ${newTask}`);
        CreateNewTask(newTask);
        closeModal();
    };

    return (
        <div className="">
                <div className='fixed z-10 inset-0 overflow-y-auto'>
                    <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900  opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-purple-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-[#BC13FE] text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form
                                onSubmit={handleSubmit}
                                className="h-full w-full p-4 flex flex-col gap-2 rounded m-auto"
                            >
                                <section>
                                    <input
                                        value={newTask.name}
                                        type="text"
                                        id="name"
                                        name='name'
                                        onChange={handleTextChange}
                                        placeholder="What are you working on?"
                                        required
                                        className="px-2 pt-4 w-full border-b focus:outline-none font-bold italic text-xl placeholder-[#BB86FC]/40 bg-transparent "
                                    />
                                </section>
                                <div className='p-4 flex gap-4 justify-between'>
                                    <section className='flex flex-col text-sm py-1'>
                                        <label>Deadline</label>
                                        <input
                                            value={newTask.due_date}
                                            type="date"
                                            id="due_date"
                                            name='due_date'
                                            onChange={handleTextChange}
                                            placeholder="Deadline"
                                            required
                                            className="px-1 w-28 focus:outline-none bg-purple-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-[#BC13FE]"
                                        />
                                    </section>
                                    <div className='text-sm'>
                                        <section className="flex gap-4 py-1">
                                            <label>Priority:</label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    id="priority_level"
                                                    name="priority_level"
                                                    value="low"
                                                    checked={newTask.priority_level === "low"}
                                                    onChange={handleTextChange}
                                                />
                                                Low
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    id="priority_level"
                                                    name="priority_level"
                                                    value="medium"
                                                    checked={newTask.priority_level === "medium"}
                                                    onChange={handleTextChange}
                                                />
                                                Medium
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    id="priority_level"
                                                    name="priority_level"
                                                    value="high"
                                                    checked={newTask.priority_level === "high"}
                                                    onChange={handleTextChange}
                                                />
                                                High
                                            </label>
                                        </section>
                                        <section className="flex gap-4 py-1">
                                            <label>Repeat:</label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    id="repeat_interval"
                                                    name="repeat_interval"
                                                    value="daily"
                                                    checked={newTask.repeat_interval === "daily"}
                                                    onChange={handleTextChange}
                                                />
                                                Daily
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    id="repeat_interval"
                                                    name="repeat_interval"
                                                    value="weekly"
                                                    checked={newTask.repeat_interval === "weekly"}
                                                    onChange={handleTextChange}
                                                />
                                                Weekly
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    id="repeat_interval"
                                                    name="repeat_interval"
                                                    value="monthly"
                                                    checked={newTask.repeat_interval === "monthly"}
                                                    onChange={handleTextChange}
                                                />
                                                Monthly
                                            </label>
                                        </section>
                                    </div>
                                </div>
                                {/* <div className='px-4 pb-4 flex gap-2'>
                                    <label>Est Pomodoros</label>
                                    <input
                                        value=""
                                        type="number"
                                        id="number"
                                        name='number'
                                        // onChange={handleTextChange}
                                        placeholder="1"
                                        required
                                        className="px-1 w-16 text-center focus:outline-none bg-purple-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-[#BC13FE] mb-4"
                                    />
                                    <div className=''>
                                        <button className='bg-[#48FF13] border border-[#48FF13] text-[#121212] rounded px-2 py-0.5'><TiArrowSortedUp size={20} /></button>
                                        <button className='bg-[#F79404] border border-[#F79404] text-[#121212] rounded px-2 py-0.5 mx-1'><TiArrowSortedDown size={20} /></button>
                                    </div>
                                </div> */}
                                <section className="flex justify-evenly my-2">
                                    <button type="submit" className='bg-[#BC13FE] border border-[#BC13FE] hover:bg-[#7301EC] px-4 py-1 rounded'>Save</button>
                                    <Link to={`/tasks`} className="ml-2">
                                        <button type="button" className='border border-[#121212] dark:border-[#ececec] hover:bg-[#F79404] hover:border-[#F79404] hover:dark:border-[#F79404] px-2 py-1 rounded'>Cancel</button>
                                    </Link>
                                </section>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
    );
};
