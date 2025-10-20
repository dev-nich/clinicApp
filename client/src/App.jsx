// import { useState } from 'react'
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./pages/Test";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { PAGES } from "./constants/pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Header>
            <Routes>
              {PAGES.map((item) => {
                return <Route path={item.path} element={item.component} />;
              })}
            </Routes>
          </Header>
        </AuthProvider>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
