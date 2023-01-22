import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

const Header = () => {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/?page=1&q=${q}`);
    }
  };

  useEffect(() => {
    if (location.pathname && location.search) {
      if (searchParams.get("q")) {
        setQ(searchParams.get("q"));
      }
    } else if (location.pathname !== "/") {
      setQ("");
    }
  }, [location]);

  return (
    <label>
      <input
        type="search"
        name="search-anime"
        placeholder="Search anime..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </label>
  );
};

export default Header;
