import { getAuth } from "firebase/auth";

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
    </div>
  );
}

export default Dashboard;
