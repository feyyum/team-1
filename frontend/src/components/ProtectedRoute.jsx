import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function ProtectedRoute() {
  const navigate = useNavigate();

  const user = null;

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

export default ProtectedRoute;
