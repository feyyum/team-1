import { useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

function Authentication() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

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

  return (
    <div>
      <p>Login With Google</p>
      <button
        type="button"
        onClick={() => {
          if (auth.currentUser) {
            // Sign out the user
            auth.signOut();
            return;
          }
          signInWithPopup(auth, provider)
            .then((result) => {
              // This gives you a Google Access Token. You can use it to access the Google API.
              // const credential = GoogleAuthProvider.credentialFromResult(result);
              // const token = credential.accessToken;
              // The signed-in user info.
              const user = result.user;
              // IdP data available using getAdditionalUserInfo(result)
              // ...
              // console.log(user);
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
            });
        }}
      >
        {user ? "Logout" : "Login"}
      </button>
    </div>
  );
}

export default Authentication;
