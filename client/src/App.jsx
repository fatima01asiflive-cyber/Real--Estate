import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages Imports (Path aur Capital 'P' ka khayal rakha gaya hai)
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import About from "./Pages/About";
import Profile from "./Pages/Profile";

// Components Import
import Header from "./Components/Header";

export default function App() {
  return (
    <BrowserRouter>
      {/* Header har page par nazar aayega */}
      <Header />
      
      <Routes>
        {/* Saare Route Paths niche diye gaye hain */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Agar koi galat URL likhe to 404 message */}
        <Route path="*" element={<div className="p-10 text-center text-2xl">404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
