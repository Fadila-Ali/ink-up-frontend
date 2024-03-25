import React, { useState } from 'react';

export const Filters = ({ currentNotes, setNotes, originalNotes }) => {
    const [startDate, setStartDate] = useState(null); // State variable for start date
    const [endDate, setEndDate] = useState(null); // State variable for end date
    const [filterByLatest, setFilterByLatest] = useState(false); // State variable for filtering by latest
    const [filterByOldest, setFilterByOldest] = useState(false); // State variable for filtering by oldest

    // Function to handle filtering by latest
    const handleFilterByLatest = (isChecked) => {
        setFilterByLatest(isChecked);
        if (isChecked) {
            setFilterByOldest(false);
            handleFilter('latest');
        } else {
            resetFilter();
        }
    };

    // Function to handle filtering by oldest
    const handleFilterByOldest = (isChecked) => {
        setFilterByOldest(isChecked);
        if (isChecked) {
            setFilterByLatest(false);
            handleFilter('oldest');
        } else {
            resetFilter();
        }
    };

    // Function to filter notes based on latest or oldest
    const handleFilter = (type) => {
        let sortedNotes = [...currentNotes];
        if (type === 'latest') {
            sortedNotes.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));
        } else if (type === 'oldest') {
            sortedNotes.sort((a, b) => new Date(a.date_created) - new Date(b.date_created));
        }
        setNotes(sortedNotes);
    };

    // Function to filter notes based on date range
    const handleFilterByDateRange = () => {
        if (!startDate || !endDate) {
            // If start date or end date is not selected, do not filter
            return;
        }
        // Convert start and end dates to UTC midnight to ensure accurate comparison
        const startUTC = new Date(startDate);
        startUTC.setUTCHours(0, 0, 0, 0);
        const endUTC = new Date(endDate);
        endUTC.setUTCHours(23, 59, 59, 999);

        // Filter notes based on date range
        const filteredNotes = currentNotes.filter(note => {
            const noteDate = new Date(note.date_created);
            return noteDate >= startUTC && noteDate <= endUTC;
        });

        // Set filtered notes
        setNotes(filteredNotes);
    };

    // Function to reset filter and display original unfiltered notes
    const resetFilter = () => {
        setNotes(originalNotes);
        setStartDate(null);
        setEndDate(null);
        setFilterByLatest(false);
        setFilterByOldest(false);
    };

    return (
        <article className="mt-4 mx-6">
            <h2 className="text-lg mt-6">Filter notes by:</h2>
            <div className="flex gap-6 text-md font-bold">
                <label>
                    <input
                        type="checkbox"
                        checked={filterByLatest}
                        onChange={(e) => handleFilterByLatest(e.target.checked)}
                    />
                    Latest
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={filterByOldest}
                        onChange={(e) => handleFilterByOldest(e.target.checked)}
                    />
                    Oldest
                </label>
            </div>
            <div className="my-6">
                <label className='w-full text-lg'>Date range:</label>
                {/* Date picker for start date */}
                <div className='flex justify-between gap-4 text-sm'>
                    <input
                        type="date"
                        value={startDate ? startDate.toISOString().split('T')[0] : ''}
                        onChange={(e) => setStartDate(new Date(e.target.value))}
                        className="shadow-md rounded px-3 py-2"
                    />
                    {/* Date picker for end date */}
                    <input
                        type="date"
                        value={endDate ? endDate.toISOString().split('T')[0] : ''}
                        onChange={(e) => setEndDate(new Date(e.target.value))}
                        className="shadow-md rounded px-3 py-2"
                    />
                </div>
                {/* Filter button */}
                <button
                    onClick={handleFilterByDateRange}
                    className="bg-[#04d9ff] hover:opacity-70 w-full my-2 text-white font-bold py-2 px-4 rounded"
                >
                    Filter Notes
                </button>
                {/* Reset button */}
                <button
                    onClick={resetFilter}
                    className="bg-red-500 hover:bg-red-700 w-full my-2 text-white font-bold py-2 px-4 rounded"
                >
                    Reset Filter
                </button>
            </div>
        </article>
    );
};
