import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100dvh-6rem)] flex flex-row justify-center items-center">
      <div className="flex flex-col gap-6 py-16">
        <h1 className="bg-red text-6xl text-center">Connect, Select, Deploy</h1>
        <div className="flex justify-center">
          <div
            className="inline-block py-2 px-3 rounded-md bg-white text-black cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Create Now!
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
