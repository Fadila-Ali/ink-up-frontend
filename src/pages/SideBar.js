import React from 'react';
import { Menu } from '../components/Menu'

export const SideBar = ({menu, setMenu}) => {
  return (
    <div className='w-full'>
        <Menu menu={menu} setMenu={setMenu} />
    </div>
  )
}
