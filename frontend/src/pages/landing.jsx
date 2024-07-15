import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "../components/loading";
function Landing() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const handleSignUp = () => {
    navigate("/register");
  };

  const handleLogIn = () => {
    navigate("/login");
  };
  useEffect(() => {
    setLoading(false)
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      {loading ? (
        <Loading />
      ) : (
        <>
          <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center ">
              <div className="text-white font-bold text-xl flex">
                <img src="./logo.png" alt="Logo" className="h-8" />
                <span className="ml-2 click"> Software Solutions </span>
              </div>
              <ul className="flex space-x-4">
                <li>
                  <a href="#" className="text-white hover:text-blue-200">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-blue-200">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-blue-200">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-blue-200">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-blue-200">
                    About Us
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-grow container mx-auto py-12 px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl font-bold mb-4">
                  Welcome to Our Platform
                </h1>
                <p className="mb-6">
                  Experience the best services with our innovative solutions.
                </p>
                <div className="space-x-4">
                  <button
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </button>
                  <button
                    className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300"
                    onClick={handleLogIn}
                  >
                    Log In
                  </button>
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src="./landingPage.png"
                  alt="Platform"
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
              <p>&copy; 2024 Your Company. All rights reserved.</p>
              <div className="mt-2">
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
                <span className="mx-2">|</span>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default Landing;
