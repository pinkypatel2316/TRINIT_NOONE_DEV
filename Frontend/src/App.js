import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import Sidebar from "./Pages/Sidebar";
import TutorRegister from "./Pages/Tutor/Register";
import StudentRegister from "./Pages/Student/Register";
import Header from "./Pages/Header";
import Dashboard from "./Pages/Dashboard";
import Newsandannc from "./Pages/Newsandannc";
import Allcourses from "./Pages/Allcourses";
import Upcomeing from "./Pages/Upcomeing";
import Viewcourses from "./Pages/Viewcourses";
import Setting from "./Pages/Setting";
import Students from "./Pages/Students";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tutorregister" element={<TutorRegister />}></Route>
        <Route path="/studentregister" element={<StudentRegister />}></Route>
        <Route path="/Sidebar" element={<Sidebar />}></Route>
        <Route path="/Header" element={<Header />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/Newsandannc" element={<Newsandannc />}></Route>
        <Route path="/Allcourses" element={<Allcourses />}></Route>
        <Route path="/Upcomeing" element={<Upcomeing />}></Route>
        <Route path="/Viewcourses" element={<Viewcourses />}></Route>
        <Route path="/Setting" element={<Setting />}></Route>
        <Route path="/Students" element={<Students />}></Route>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
