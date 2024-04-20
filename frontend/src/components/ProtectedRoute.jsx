/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  const [user, setUser] = useState(undefined);

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

  useEffect(() => {
    if (user === null) {
      navigate("/auth", {
        state: {
          from: location.pathname,
        },
      });
    }
  }, [user]);

  return <>{children}</>;
}

export default ProtectedRoute;
