import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul className="flex gap-3">
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>

      <div className="m-auto max-w-[1000px]">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
