import { Link } from "react-router-dom";

import SearchBar from "../components/SearchBar";

const Header = () => {
  return (
    <div className="bg-gray-100">
      <nav className="m-auto max-w-[1000px] px-3">
        <ul className="flex gap-3 justify-between items-center h-[57px]">
          <li>
            <Link className="text-xl font-medium" to="/">My Anime</Link>
          </li>
          <li>
            <SearchBar />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
