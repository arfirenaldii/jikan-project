import { Outlet, Link } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <>
      <Header />

      <div className="m-auto max-w-[1000px]">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
