import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/Authprovider";
import logo from "../../../assets/images/logo.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut().then().catch();
  };

  const navLinks = (
    <>
      <li className="font-bold text-xl text-purple">
        <NavLink to="/">Home</NavLink>
      </li>
      {/* <li className="font-bold text-xl text-purple">
        <NavLink to="/addBook">Add Book</NavLink>
      </li>

      <li className="font-bold text-xl text-purple">
        <NavLink to="/allBooks">All Books</NavLink>
      </li>
      <li className="font-bold text-xl text-purple">
        <NavLink to="/borrowedBooks">Borrowed Books</NavLink>
      </li> */}
    </>
  );

  return (
    <div className="mb-10 h-[120px] pt-4">
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown z-50">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <a className="btn btn-ghost text-4xl  text-purple font-bold">
            <div className="flex">
              <img className="h-10 w-20" src={logo} alt="" />
              <span>Synapse</span>
            </div>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">{navLinks}</ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div title={user?.displayName} className="w-20 rounded-full">
                  <img className="w-[70px] h-[70px]" src={user?.photoURL}
                    alt=""
                  />
                </div>

                <span className="text-xl">
                  {/* {user?.displayName} */}
                  <NavLink to="/dashboard">
                    <button className="btn bg-purple text-xl text-white ml-1">
                      Dashboard
                    </button>
                  </NavLink>
                </span>
              </div>
              <button
                onClick={handleLogOut}
                className="btn text-2xl bg-purple text-white ml-1"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <NavLink to="/login">
                <button className="btn bg-purple text-xl text-white ml-1">
                  Login
                </button>
              </NavLink>
              <NavLink to="/register">
                <button className="btn bg-purple text-xl text-white ml-1">
                  Sign Up
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
