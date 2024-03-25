import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { UserProvider } from './contexts/userContext';
import { Dashboard } from "./pages/Dashboard";
import { Hearder } from "./pages/Hearder";
import { NewNotePage } from "./pages/NewNotePage";
import { NoteDetailsPage } from "./pages/NoteDetailsPage";
import { SideBar } from "./pages/SideBar";
import { LandingPage } from "./pages/LandingPage";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { TasksPage } from "./pages/TasksPage";
import { FooterPage } from "./pages/FooterPage";
import { NotesPage } from "./pages/NotesPage";
import { FocusPage } from "./pages/FocusPage";
import './App.css';

function App() {
  const [menu, setMenu] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`App bg-[#ececec] text-[#121212] dark:bg-[#121212] dark:text-[#ffffff] ${darkMode ? 'dark' : ''}`}>
      <Router>
        <UserProvider>
            <div className="Header">
              <Hearder darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
            <div className={menu ? 'Side bg-[#ececec] text-[#121212] dark:bg-[#121212] dark:text-[#ffffff] border-r border-dotted border-gray-400 dark:border-gray-700' : ''}>
              <SideBar menu={menu} setMenu={setMenu} />
            </div>
          <main className="Main bg-[#ececec] text-[#121212] dark:bg-[#121212] dark:text-[#ffffff]">
            <Routes>
              <Route path="/" element={<LandingPage/>} />
              <Route path="/signup" element={<SignupPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/profile" element={<ProfilePage/>}/>
              <Route path="/pomodoro" element={<FocusPage/>}/>
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/tasks" element={<TasksPage/>} />
              <Route path="/notes" element={<NotesPage/>}/>
              <Route path="/newnote" element={<NewNotePage/>} />
              <Route path="/notes/:id" element={<NoteDetailsPage/>} />
            </Routes>
          </main>
          <div className="Footer">
            <FooterPage/>
          </div>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
