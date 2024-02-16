import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars } from "react-icons/fa";

export const Menu = ({ menu, setMenu }) => {
  const [activeLink, setActiveLink] = useState('/');

  const handleLinkClick = (path, event) => {
    setActiveLink(path);
    // prevent menu from toogling
    event.stopPropagation(); // Stop the event from bubbling up to the parent article
  };

  return (
    <div className='bg-slate-800 text-white h-[4em] w-full'>
      <article onClick={() => setMenu(!menu)} className="cursor-pointer">
        <FaBars size={22} style={{ position: 'absolute', top: '1.5em', left: '1em' }} />
        {menu && (
          <ul className='flex flex-col items-center gap-y-6 pt-[4em] w-[90%]'>
            <li className='bg-[#e4ce47] rounded-md hover:opacity-80 px-4 py-[1px] w-full'>
              <button>
                <Link to={`/newnote`}>New</Link>
              </button>
            </li>
            <li className={`rounded-md hover:opacity-80 px-4 py-[1px] ${activeLink === '/' ? 'bg-slate-700' : ''}`}>
              <button onClick={(e) => handleLinkClick('/', e)}>
                <Link to='/notes'>Notes</Link>
              </button>
            </li>
            <li className={`rounded-md hover:opacity-80 px-4 py-[1px] ${activeLink === '/tasks' ? 'bg-slate-700' : ''}`}>
              <button onClick={(e) => handleLinkClick('/tasks', e)}>
                <Link to='/tasks'>Tasks</Link>
              </button>
            </li>
            <li className={`rounded-md hover:opacity-80 px-4 py-[1px] ${activeLink === '/favorites' ? 'bg-slate-700' : ''}`}>
              <button onClick={(e) => handleLinkClick('/favorites', e)}>
                <Link to='/favorites'>Favorites</Link>
              </button>
            </li>
          </ul>
        )}
      </article>
    </div>
  );
};
