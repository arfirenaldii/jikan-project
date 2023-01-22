import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import "./SearchBar.css";

const Header = () => {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const handleSearch = () => {
    navigate(`/?page=1&q=${q}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (location.pathname && location.search) {
      if (searchParams.get("q")) {
        setQ(searchParams.get("q"));
      }
    } else if (location.pathname === "/" && !location.search) {
      setQ("");
    } else if (location.pathname !== "/") {
      setQ("");
    }
  }, [location]);

  return (
    <label>
      <input
        className="h-[40px] px-5 py-2 rounded-lg"
        type="search"
        name="search-anime"
        autoComplete="off"
        placeholder="Search anime"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </label>
  );
};

export default Header;
