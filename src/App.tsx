import { Route, Routes } from "react-router-dom"
import RenderAlert from "./components/alert"
import RenderNavbar from "./components/navbar"
import RenderHome from "./components/home"

function App() {
  return (
    <>
      <RenderAlert />
      <RenderNavbar />
      <Routes>
        <Route path="/" element={<RenderHome />} />
        
      </Routes>
    </>
  )
}

export default App
