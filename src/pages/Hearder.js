import React from 'react'
import { NavBar } from '../components/NavBar'

export const Hearder = ({darkMode, setDarkMode}) => {
  return (
    <div>
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  )
}
