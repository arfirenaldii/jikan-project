import { Link } from "react-router-dom";

import SearchBar from "../components/SearchBar";

const Header = () => {
  return (
    <nav className="m-auto max-w-[1000px]">
      <ul className="flex gap-3 justify-between">
        <li>
          <Link to="/">My Anime</Link>
        </li>
        <li>
          <SearchBar />
        </li>
      </ul>
    </nav>
  );
};

export default Header;
