import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Search = ({ currentNotes }) => {
    const [search, setSearch] = useState(""); // store keyword searched by user
    const [showModal, setShowModal] = useState(false); // state to control the visibility of the search modal
    const [showPlaceholder, setShowPlaceholder] = useState(true); // state to control the visibility of the placeholder text

    // function allows user to search for a keyword
    const handleSearch = () => {
        return search ? (
            currentNotes.filter((note) => {
                return note.title.toLowerCase().startsWith(search.toLowerCase());
            })
            .map((note, index) => {
                return (
                    <Link to={`/notes/${note.id}`} key={index} className='flex justify-between border-b border-dotted p-1 hover:bg-[#ececec] rounded-md'>
                        <h3>{note.title}</h3>
                        <p>note</p>
                    </Link>
                );
            })
        ) : <p>Try searching for people, notes, or keywords</p>;
    };

    // function to clear user input
    const handleClearSearch = () => {
        setSearch(""); // clear the search input
        setShowModal(false); // hide the search modal
        setShowPlaceholder(true); // show the placeholder text
    };

    // function to handle click on input
    const handleClickInput = () => {
        setShowPlaceholder(false); // hide the placeholder text
        setShowModal(true); // show the search modal
    };

    // function to handle input change
    const handleChangeInput = (event) => {
        setSearch(event.target.value);
        setShowModal(true); // show the search modal
        if (event.target.value === "") {
            setShowPlaceholder(true); // show the placeholder text if input is empty
        } else {
            setShowPlaceholder(false); // hide the placeholder text if input is not empty
        }
    };

    return (
        <article className='mb-4'>
            <div className="flex flex-col group w-full">
                <input
                    type="text"
                    value={search}
                    id="search"
                    name="search"
                    onClick={handleClickInput} // handle click on input
                    onChange={handleChangeInput} // handle input change
                    placeholder={showPlaceholder ? "Search" : ""}
                    className="w-full bg-gray-300 shadow shadow-slate-200 px-6 py-2.5 rounded-full focus:outline focus:outline-[#04d9ff]"
                />
                {/* Search Modal */}
                {showModal && (
                    <div className="flex justify-center h-[20rem] overflow-y-auto scrollbar-hide mt-[1px]">
                        <div className="bg-white w-full p-4 mx-2 rounded-md shadow-md shadow-gray-300">
                            <nav className="text-lg font-semibold mb-2 flex justify-between">
                                <h2 className=''>Search Results</h2>
                                <p onClick={handleClearSearch} className='cursor-pointer'>X</p>
                            </nav>
                            <div>{handleSearch()}</div>
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
};
