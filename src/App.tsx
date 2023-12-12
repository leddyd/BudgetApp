import { Route, Routes } from "react-router-dom"
import RenderAlert from "./components/signed-out/alert"
import RenderNonUserNavbar from "./components/signed-out/nonuser-navbar"
import RenderHome from "./components/signed-out/home"
import React from "react"
import RenderLogin from "./components/signed-out/login"
import RenderUserNavbar from "./components/signed-in/user-navbar"
import RenderExpenses from "./components/signed-in/expenses"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <>
            <RenderAlert />
            <RenderNonUserNavbar />
            <RenderHome />
          </>
        } />
        <Route path="/login" element={<RenderLogin />} />
        <Route path="/expenses" element={
          <div className="main-container">
            <RenderUserNavbar />
            <RenderExpenses />
          </div>
        } />
        <Route path="/goals" element={
          <div className="main-container">
            <RenderUserNavbar />
          </div>
        } />
        <Route path="/achievements" element={
          <div className="main-container">
            <RenderUserNavbar />
          </div>
        } />
      </Routes>
    </>
  )
}

export default App
