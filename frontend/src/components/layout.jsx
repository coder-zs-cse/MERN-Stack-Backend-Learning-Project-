import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMenuForRole } from "../data/menu";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import { setUser } from "../redux/userSlice";

function Layout({ children }) {
  const dispatch = useDispatch();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);

  const menuToBeRendered = getMenuForRole(user?.role);

  const handleToggleSidebar = () => {
    document.getElementsByClassName('rightbar')[0].classList.toggle('md:ml-64');
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once to set initial state

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}

      <aside className={`bg-blue-500 text-white w-64 flex-shrink-0 transition-all duration-300 ease-in-out fixed h-full z-10 ${isSidebarCollapsed ? '-translate-x-full' : 'translate-x-0'}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-center items-center border-b border-white/20 py-6 px-8">
            <h1 className="text-xl font-bold">DASHBOARD</h1>
          </div>
          <nav className="flex-grow overflow-y-auto">
            {menuToBeRendered.map((menuItem) => (
              <Link
                key={menuItem.name}
                to={menuItem.path}
                className="flex items-center px-6 py-3 text-white no-underline hover:bg-blue-600"
              >
                <i className={`${menuItem.icon} mr-3`}></i>
                {menuItem.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="flex items-center px-6 py-3 text-white no-underline hover:bg-blue-600"
              onClick={() => {
                localStorage.clear();
                dispatch(setUser(null));
              }}
            >
              <i className="ri-logout-box-r-line mr-3"></i>
              Logout
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64 rightbar">
        <header className="bg-white shadow-md p-4 flex items-center ">
          <button
            onClick={handleToggleSidebar}
            className="text-blue-500 focus:outline-none "
          >
            {isSidebarCollapsed ? <RiMenuLine size={24} /> : <RiCloseLine size={24} />}
          </button>
          <h2 className="text-xl font-semibold text-center mx-auto">Intern SE Onboarding Project</h2>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;