import { Route, Routes } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import firebaseConfig from "../firebaseConfig";
import RenderAlert from "./components/signed-out/alert";
import RenderNonUserNavbar from "./components/signed-out/nonuser-navbar";
import RenderHome from "./components/signed-out/home";
import RenderLogin from "./components/auth/login";
import RenderSignUp from "./components/auth/signup";
import RenderUserNavbar from "./components/signed-in/user-navbar";
import RenderExpenses from "./components/signed-in/expenses";
import RenderGoals from "./components/signed-in/goals";
import RenderAchievements from "./components/signed-in/achievements";
import { AuthProvider } from "./components/auth/auth";
import { RequireAuth } from "./components/auth/requireAuth";
import { ReactNode } from "react";

firebase.initializeApp(firebaseConfig);

function ProtectedRoute({ element }: { element: ReactNode }) {
  return (
    <RequireAuth>
      <div className="main-container">
        <RenderUserNavbar />
        {element}
      </div>
    </RequireAuth>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <div className="wrapper">
              <RenderAlert />
              <RenderNonUserNavbar />
              <RenderHome />
            </div>
          }
        />
        <Route path="/login" element={<RenderLogin />} />
        <Route path="/signup" element={<RenderSignUp />} />
        <Route path="/profile" element={<ProtectedRoute element={<></>} />} />
        <Route path="/expenses" element={<ProtectedRoute element={<RenderExpenses />} />} />
        <Route path="/goals" element={<ProtectedRoute element={<RenderGoals />} />} />
        <Route path="/achievements" element={<ProtectedRoute element={<RenderAchievements />} />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;