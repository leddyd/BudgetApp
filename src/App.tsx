import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import firebaseConfig from "../firebaseConfig";
import RenderAlert from "./components/signed-out/alert";
import RenderNonUserNavbar from "./components/signed-out/nonuser-navbar";
import RenderHome from "./components/signed-out/home";
import RenderLogin from "./components/signed-out/login";
import RenderUserNavbar from "./components/signed-in/user-navbar";
import RenderExpenses from "./components/signed-in/expenses";
import RenderGoals from "./components/signed-in/goals";
import RenderAchievements from "./components/signed-in/achievements";

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
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
        <Route
          path="/profile"
          element={
            <div className="main-container">
              {user ? <RenderUserNavbar /> : null}
            </div>
          }
        />
        <Route
          path="/expenses"
          element={
            <div className="main-container">
              {user ? <RenderUserNavbar /> : null}
              <RenderExpenses />
            </div>
          }
        />
        <Route
          path="/goals"
          element={
            <div className="main-container">
              {user ? <RenderUserNavbar /> : null}
              <RenderGoals />
            </div>
          }
        />
        <Route
          path="/achievements"
          element={
            <div className="main-container">
              {user ? <RenderUserNavbar /> : null}
              <RenderAchievements />
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
