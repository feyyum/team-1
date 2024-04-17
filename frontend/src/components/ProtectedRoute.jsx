import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
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
      navigate("/auth");
    }
  }, [user]);

  return <>{children}</>;
}

export default ProtectedRoute;
