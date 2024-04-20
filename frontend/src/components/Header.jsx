import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Import context
import { AuthContext } from "../App";

// Import icons
import Logo from "../assets/icons/logo.svg";
import Caramel from "../assets/icons/caramel.svg";

function Header() {
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(user);

  return (
    <div className="flex flex-row justify-between items-center py-4 mb-4 min-h-20 sm: px-4">
      <div
        className="flex flex-row items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={Logo} alt="" className="mt-[-6px]" />
        <div className="border-l-[1px] border-gray-600 h-[60%] ml-3" />
        <img src={Caramel} alt="" />
      </div>
      <div>
        {user ? (
          <div className="flex flex-row items-center gap-8">
            <div className="flex flex-row gap-8 font-light text-md">
              <a
                className="cursor-pointer no-underline"
                href="https://github.com/itublockchain/team-1"
                target="_blank"
              >
                Docs
              </a>
              <p
                className="cursor-pointer"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </p>
            </div>
            <div>
              <img
                className="w-12 h-12 rounded-full"
                // src={"https://xsgames.co/randomusers/avatar.php?g=pixel"}
                src={user.photoURL}
                alt=""
              />
            </div>
          </div>
        ) : (
          <div
            className="py-2 px-3 rounded-md bg-blue-800 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
