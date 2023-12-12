import { Route, Routes } from "react-router-dom"
import RenderAlert from "./components/alert"
import RenderNavbar from "./components/navbar"
import RenderHome from "./components/home"
import React from "react"
import RenderLogin from "./components/login"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <>
            <RenderAlert />
            <RenderNavbar />
            <RenderHome />
          </>
        } />
        <Route path="/login" element={<RenderLogin />} />
      </Routes>
    </>
  )
}

export default App
