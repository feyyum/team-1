import { v4 as uuidv4 } from "uuid";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "../../firebase";

function Dashboard() {
  const auth = getAuth();

  return (
    <div className="pb-8 sm: mx-4">
      <div className="flex flex-row gap-4 mb-4">
        <div className="py-1 px-2 border-b-[1px] border-gray-500">
          <p>Overview</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-6 mx-auto md:justify-normal sm:justify-center">
        <div className="w-full max-w-[580px] sm: flex flex-col gap-4">
          <div className="w-full bg-[#1C1C1C] rounded-3xl p-8 flex gap-4">
            <div>
              <img
                src={auth.currentUser?.photoURL}
                alt=""
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <div className="mb-4">
                <h3 className="mb-1 font-bold text-xl">Project Name</h3>
                <p className="font-thin">Contract Name: Contract.rs</p>
              </div>
              <div className="flex flex-row mb-4 gap-2">
                <div className="py-1 px-4 bg-[#3F3838] rounded-full cursor-default text-sm font-extralight">
                  <p>Ethereum</p>
                </div>
                <div className="py-1 px-4 bg-[#3F3838] rounded-full cursor-default text-sm font-extralight">
                  <p>Neon EVM</p>
                </div>
                <div className="py-1 px-4 bg-[#3F3838] rounded-full cursor-default text-sm font-extralight">
                  <p>GNOSIS</p>
                </div>
              </div>
              <div className="mb-4 flex flex-row gap-2 items-center">
                <p>Status:</p>
                <p className="text-yellow-600">Converting</p>
                <div className="w-2 h-2 rounded-full bg-yellow-600 animate-pulse" />
              </div>
              <div>
                <h4 className="mb-1 font-bold text-xl">Deployments</h4>
                <div className="flex flex-row gap-2 items-center">
                  <p>Ethereum:</p>
                  <p className="text-yellow-600">Pending</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <p>Neon EVM:</p>
                  <p className="text-yellow-600">Pending</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <p>GNOSIS:</p>
                  <p className="text-yellow-600">Pending</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[580px] sm: flex flex-col gap-4">
          <div className="w-full bg-[#1C1C1C] rounded-3xl p-8 flex gap-4">
            <div>
              <img
                src={auth.currentUser?.photoURL}
                alt=""
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <div className="mb-4">
                <h3 className="mb-1 font-bold text-xl">Project Name</h3>
                <p className="font-thin">Contract Name: Contract.rs</p>
              </div>
              <div className="flex flex-row mb-4 gap-2">
                <div className="py-1 px-4 bg-[#3F3838] rounded-full cursor-default text-sm font-extralight">
                  <p>Ethereum</p>
                </div>
                <div className="py-1 px-4 bg-[#3F3838] rounded-full cursor-default text-sm font-extralight">
                  <p>Neon EVM</p>
                </div>
                <div className="py-1 px-4 bg-[#3F3838] rounded-full cursor-default text-sm font-extralight">
                  <p>GNOSIS</p>
                </div>
              </div>
              <div className="mb-4 flex flex-row gap-2 items-center">
                <p>Status:</p>
                <p className="text-yellow-600">Converting</p>
                <div className="w-2 h-2 rounded-full bg-yellow-600 animate-pulse" />
              </div>
              <div>
                <h4 className="mb-1 font-bold text-xl">Deployments</h4>
                <div className="flex flex-row gap-2 items-center">
                  <p>Ethereum:</p>
                  <p className="text-yellow-600">Pending</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <p>Neon EVM:</p>
                  <p className="text-yellow-600">Pending</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <p>GNOSIS:</p>
                  <p className="text-yellow-600">Pending</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[580px] sm: flex flex-col gap-4">
          <div className="w-full bg-[#1C1C1C] rounded-3xl p-8 flex gap-4">
            <div>
              <img
                src={auth.currentUser?.photoURL}
                alt=""
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <div className="mb-4">
                <h3 className="mb-1 font-bold text-xl">Project Name</h3>
                <p className="font-thin">Contract Name: Contract.rs</p>
              </div>
              <div className="flex flex-row mb-4 gap-2">
                <div className="py-1 px-4 bg-[#3F3838] rounded-full cursor-default text-sm font-extralight">
                  <p>Ethereum</p>
                </div>
                <div className="py-1 px-4 bg-[#3F3838] rounded-full cursor-default text-sm font-extralight">
                  <p>Neon EVM</p>
                </div>
                <div className="py-1 px-4 bg-[#3F3838] rounded-full cursor-default text-sm font-extralight">
                  <p>GNOSIS</p>
                </div>
              </div>
              <div className="mb-4 flex flex-row gap-2 items-center">
                <p>Status:</p>
                <p className="text-yellow-600">Converting</p>
                <div className="w-2 h-2 rounded-full bg-yellow-600 animate-pulse" />
              </div>
              <div>
                <h4 className="mb-1 font-bold text-xl">Deployments</h4>
                <div className="flex flex-row gap-2 items-center">
                  <p>Ethereum:</p>
                  <p className="text-yellow-600">Pending</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <p>Neon EVM:</p>
                  <p className="text-yellow-600">Pending</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <p>GNOSIS:</p>
                  <p className="text-yellow-600">Pending</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

{
  /* <div>
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
</div>; */
}
