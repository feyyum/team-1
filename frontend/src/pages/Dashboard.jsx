import { v4 as uuidv4 } from "uuid";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "../../firebase";

function Dashboard() {
  const auth = getAuth();

  return (
    <div>
      <p>Dashboard</p>
      <button
        type="button"
        onClick={() => {
          // Sign out the user
          auth.signOut();
        }}
      >
        Logout
      </button>
      <br />
      <br />
      <p>Regenerate KEY</p>
      <button
        type="button"
        onClick={async () => {
          const docRef = doc(db, "users", auth.currentUser.uid);

          try {
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
              throw new Error("No such document!");
            }

            await setDoc(docRef, {
              ...docSnap.data(),
              apiKey: uuidv4(),
            });
          } catch (e) {
            console.error("Error getting document:", e);
          }
        }}
      >
        Generate
      </button>
    </div>
  );
}

export default Dashboard;
