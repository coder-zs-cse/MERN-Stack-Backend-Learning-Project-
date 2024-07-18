import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userMenu, adminMenu, doctorMenu, getMenuForRole } from "../data/menu";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import { setUser } from "../redux/userSlice";


function Layout({ children }) {
  const dispatch = useDispatch()
  
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);

  

  const menuToBeRendered = getMenuForRole(user?.role);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Media query for responsive sidebar collapsing on smaller screens
  const handleMediaQueryChange = (event) => {
    setIsSidebarCollapsed(event.matches); // Collapse sidebar on small screens
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)"); // Adjust breakpoint as needed
    mediaQuery.addListener(handleMediaQueryChange);

    // Cleanup function to remove event listener on unmount
    return () => mediaQuery.removeListener(handleMediaQueryChange);
  }, [user]);

  return (
    <div className="main h-screen p-3">

      <div className="flex h-full">
        <div
          className={`sidebar bg-blue-500 rounded mr-3 p-3 w-64 overflow-hidden transition duration-200 ease-in-out ${
            isSidebarCollapsed ? "hidden md:block" : "block"
          }`} // Tailwind classes for responsiveness
        >
          <div className="flex justify-center items-center border-b border-white/20">
            <div className="text-white sidebar-header flex items-center gap-4 py-6 px-8 text-xl">
              DASHBOARD
            </div>
          </div>
          <div className="menu text-white mt-5">
            {menuToBeRendered.map((menuItem) => (
              <div className="flex" key={menuItem.name}>
                <i className={menuItem.icon}></i>
                <Link
                  to={menuItem.path}
                  className="text-white ml-2 no-underline mb-3 mt-3"
                >
                  {menuItem.name}
                </Link>
              </div>
            ))}
            <div
              className="flex"
              onClick={async () => {
                localStorage.clear();
                dispatch(setUser(null));
              }}
            >
              <i className="ri-logout-box-r-line self-center"></i>
              <Link
                to="/login"
                className="text-white ml-2 no-underline mb-3 mt-3"
              >
                Logout
              </Link>
            </div>
          </div>
          <button
            className={`transition duration-200 ease-in-out absolute top-0 left-0 mt-4 ml-4 p-2 rounded-full focus:outline-none ${
              isSidebarCollapsed
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-blue-500"
            }`}
            onClick={handleToggleSidebar}
          >
            {isSidebarCollapsed ? <RiCloseLine /> : <RiMenuLine />}
          </button>
        </div>
        <div className="content rounded flex-grow">
          <div
            className="header bg-white flex justify-center items-center shadow-outline border shadow-md rounded mt-1 p-3"
            style={{ height: "7vh" }}
          >
            Intern SE Onboarding Project
          </div>
          <div className="body w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
