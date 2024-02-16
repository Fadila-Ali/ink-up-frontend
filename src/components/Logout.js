import React, { useContext } from 'react';
import { UserContext } from './UserProvider';

const Logout = () => {
  const { logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
