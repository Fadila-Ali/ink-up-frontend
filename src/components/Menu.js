import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars } from "react-icons/fa";

export const Menu = ({ menu, setMenu }) => {
  const [activeLink, setActiveLink] = useState('/dashboard');

  const handleLinkClick = (path, event) => {
    setActiveLink(path);
    // prevent menu from toggling
    event.stopPropagation(); // Stop the event from bubbling up to the parent article
  };

  // Define an array of menu items
  const menuItems = [
    { path: '/pomodoro', name: 'Focus Mode' },
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/tasks', name: 'Tasks' },
    { path: '/notes', name: 'Notes' },
    { path: '/profile', name: 'Profile' },
    { path: '/settings', name: 'Settings' }
  ];

  return (
    <div className='bg-[#ececec] text-[#121212] dark:bg-[#121212] dark:text-[#ffffff] h-full w-full'>
      <article onClick={() => setMenu(!menu)} className="cursor-pointer">
        {/* <FaBars size={22} style={{ position: 'absolute', top: '1.5em', left: '1em', background: '#181919' }} /> */}
        {menu && (
          <ul className='flex flex-col pt-[4em] w-[90%] mx-2 text-xl'>
            {menuItems.map((item, index) => (
              <li key={index} className={`rounded-md hover:opacity-80 w-full px-4 py-[5px] mb-2 ${activeLink === item.path ? 'h-full w-full bg-[#BC13FE] rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 shadow-sm' : ''}`} style={{ backgroundColor: item.path === '/pomodoro' ? '#BC13FE' : ''}}>
                <button onClick={(e) => handleLinkClick(item.path, e)}>
                  <Link to={item.path}>{item.name}</Link>
                </button>
              </li>
            ))}
          </ul>
        )}
      </article>
    </div>
  );
};
