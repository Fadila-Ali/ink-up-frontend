import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
// import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(() => {
        // Initialize state with localStorage data or an empty object if not present
        const storedData = localStorage.getItem('ink-up');
        return storedData ? JSON.parse(storedData) : {};
      });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


     // Function to handle user signup
    const signup = async (userData) => {
        try {
        const response = await axios.post(`${API}/register`, userData);
        if (response.status === 201) {
            console.log(response.data)
            setUserInfo({ user: response.data.user });
        } else {
            setError('Signup failed. Please try again.');
        }
        } catch (error) {
            console.error('Error signing up:', error);
            setError('Signup failed. Please try again.');
        }
    };



    // Function to set user data after successful login
    const login = async (userData) => {
        try {
        const response = await axios.post(`${API}/login`, userData);
        if (response.status === 200) {
            console.log(response.data);
            const { user, token } = response.data;

            // please save to local storage
            // localStorage.setItem("token", token);
            setUserInfo({ user, token });
        } else {
            setError('Login failed. Please check your credentials.');
        }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Login failed. Please check your credentials.');
        }
    };


    // See user object to verify its contents
    useEffect(() => {
        console.log('User:', userInfo);
    }, [userInfo]);
    


    // Function to clear user data after logout
    const logout = () => {
        setUserInfo({});
        localStorage.removeItem('ink-up');
        localStorage.removeItem("token");
    };
    

    // Function to update user profile
    const updateUser = async (updatedUserData) => {
        try {
            const { token } = userInfo;
            if (!token) {
                setError('User is not authenticated.');
                return;
            }
            const response = await axios.put(`${API}/users/${userInfo.user.id}`, updatedUserData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setUserInfo({ ...userInfo, user: response.data.user });
            } else {
                setError('Failed to update profile.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile.');
        }
    };


    // Check Authentication on Component Mount
    const checkAuthentication = async () => {
        try {
        const token = userInfo;
        console.log(`user data: ${userInfo}`);
        if (!token) {
            // Token not found, user is not authenticated
            return;
        }
        const response = await axios.get(`${API}/notes`, {
            headers: {
            'Authorization': `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            // User is authenticated
            console.log(response.data);
            setUserInfo({ ...userInfo, user: response.data.user });
            setError(null);
        } else {
            setError('Authentication failed. Please log in again.');
        }
        } catch (error) {
            console.error('Error checking authentication:', error);
            setError('Authentication failed. Please log in again.');
        } finally {
            setLoading(false);
        }
    };
    
    // Call the function on component mount
    useEffect(() => {
        checkAuthentication();
    }, []);
  

    // Save user data to localStorage when user data changes
    useEffect(() => {
        localStorage.setItem('ink-up', JSON.stringify(userInfo));
      }, [userInfo]);


     // Function to create a new note
//   const createNote = async (noteData) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('User is not authenticated.');
//         return;
//       }
//       const response = await axios.post(`${API}/notes`, noteData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       if (response.status === 201) {
//         // Note created successfully
//         // You can update the UI or perform any other actions as needed
//       } else {
//         setError('Failed to create note.');
//       }
//     } catch (error) {
//       console.error('Error creating note:', error);
//       setError('Failed to create note.');
//     }
//   };

  return (
    <UserContext.Provider value={{ userInfo, signup, login, logout, updateUser, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};


// Custom hook to access user context
// const useUser = () => useContext(UserContext);

export { UserContext, UserProvider };
