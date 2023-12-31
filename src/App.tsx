import { Route, Routes } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import firebaseConfig from "./config/firebaseConfig";
import RenderAlert from "./components/alert";
import RenderNonUserNavbar from "./components/nonuser-navbar";
import RenderFrontPage from "./pages/frontpage";
import RenderLogin from "./components/auth/login";
import RenderSignUp from "./components/auth/signup";
import RenderUserNavbar from "./components/user-navbar";
import RenderExpenses from "./pages/dashboard";
import RenderGoals from "./pages/goals";
import RenderAchievements from "./pages/achievements";
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
              <RenderFrontPage />
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