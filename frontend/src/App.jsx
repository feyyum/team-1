import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import ProtectedRoute from "./components/ProtectedRoute";

import Layout from "./pages/Layout";
import Landing from "./pages/Landing";
import Authentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";

export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(undefined);

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      setUser(user);
      // ...
    } else {
      // User is signed out
      // ...
      setUser(null);
    }
  });

  return (
    <AuthContext.Provider value={user}>
      <BrowserRouter basename="/">
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Landing />
              </Layout>
            }
          />
          <Route
            path="/auth"
            element={
              <Layout>
                <Authentication />
              </Layout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
