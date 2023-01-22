import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const handleClickGoHome = () => {
    navigate("/");
  };

  return (
    <div>
      <h1 className="text-xl font-medium">Page Not Found</h1>
      <div className="mt-3 text-center">
        <button
          className="p-2 w-fit rounded-lg bg-blue-600 text-white"
          onClick={handleClickGoHome}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
