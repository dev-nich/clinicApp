// import { useState } from 'react'
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./pages/Test";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Users from "./pages/Users";
import Header from "./components/Header"
import Footer from "./components/Footer"
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
    <BrowserRouter>
    <AuthProvider>
      <Header>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/test" element={<Test />} />
            <Route path="/users" element={<Users />} />
          </Routes>
      </Header>
      </AuthProvider>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
