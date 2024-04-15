// import { Outlet, Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        {/* <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/GridPage">GridPage</Link>
          </li>
        </ul> */}
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
