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
import './App.css';

function App() {
  const [menu, setMenu] = useState(false)

  return (
    <div className="App">
      <Router>
        <UserProvider>
            <div className="Header">
              <Hearder/>
            </div>
            <div className={menu ? 'Side' : ''}>
              <SideBar menu={menu} setMenu={setMenu} />
            </div>
          <main className="Main">
            <Routes>
              <Route path="/" element={<LandingPage/>} />
              <Route path="/signup" element={<SignupPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/profile" element={<ProfilePage/>}/>
              <Route path="/notes" element={<Dashboard/>} />
              <Route path="/newnote" element={<NewNotePage/>} />
              <Route path="/notes/:id" element={<NoteDetailsPage/>} />
            </Routes>
          </main>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
