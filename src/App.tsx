import { Route, Routes } from "react-router-dom"
import RenderAlert from "./components/signed-out/alert"
import RenderNonUserNavbar from "./components/signed-out/nonuser-navbar"
import RenderHome from "./components/signed-out/home"
import React from "react"
import RenderLogin from "./components/signed-out/login"
import RenderUserNavbar from "./components/signed-in/user-navbar"
import RenderExpenses from "./components/signed-in/expenses"
import RenderGoals from "./components/signed-in/goals"
import RenderAchievements from "./components/signed-in/achievements"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <div className="wrapper">
            <RenderAlert />
            <RenderNonUserNavbar />
            <RenderHome />
          </div>
        } />
        <Route path="/login" element={<RenderLogin />} />
        <Route path="/profile" element={
          <div className="main-container">
            <RenderUserNavbar />
          </div>
        } />
        <Route path="/expenses" element={
          <div className="main-container">
            <RenderUserNavbar />
            <RenderExpenses />
          </div>
        } />
        <Route path="/goals" element={
          <div className="main-container">
            <RenderUserNavbar />
            <RenderGoals />
          </div>
        } />
        <Route path="/achievements" element={
          <div className="main-container">
            <RenderUserNavbar />
            <RenderAchievements />
          </div>
        } />
      </Routes>
    </>
  )
}

export default App
