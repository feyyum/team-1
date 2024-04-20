import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";

import { db } from "../../firebase";
import { AuthContext } from "../App";

function Authentication() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const user = useContext(AuthContext);

  return (
    <div>
      <p>Login With Google</p>
      <button
        type="button"
        onClick={() => {
          if (user) {
            // Sign out the user
            auth.signOut();
            return;
          }
          signInWithPopup(auth, provider)
            .then(async (result) => {
              // This gives you a Google Access Token. You can use it to access the Google API.
              // const credential = GoogleAuthProvider.credentialFromResult(result);
              // const token = credential.accessToken;
              // The signed-in user info.
              const user = result.user;
              // IdP data available using getAdditionalUserInfo(result)
              // ...
              // console.log(user);
              const docRef = doc(db, "users", "SF");

              try {
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                  return;
                }
              } catch (e) {
                console.error("Error getting document:", e);
                auth.signOut();
              }

              // Add a new document with a generated id.
              const userRef = doc(db, "users", user.uid);

              try {
                await setDoc(userRef, {
                  name: user.displayName,
                  email: user.email,
                  apiKey: uuidv4(),
                  activeDeployments: [],
                  previousDeployments: [],
                });
              } catch (e) {
                console.error("Error getting document:", e);
                auth.signOut();
              }

              location.state?.from && navigate(location.state?.from);
            })
            .catch((error) => {
              // Handle Errors here.
              // const errorCode = error.code;
              // const errorMessage = error.message;
              // The email of the user's account used.
              // const email = error.customData.email;
              // The AuthCredential type that was used.
              // const credential = GoogleAuthProvider.credentialFromError(error);
              // ...
              console.error(error);
            });
        }}
      >
        {user ? "Logout" : "Login"}
      </button>
    </div>
  );
}

export default Authentication;
