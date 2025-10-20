// import { useState } from 'react'
import Login from './components/Login'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Test from './pages/Test'
import Landing from './pages/Landing'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
