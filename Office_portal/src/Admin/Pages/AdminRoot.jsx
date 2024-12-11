import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminRoot = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    !document.cookie.includes("adminToken") && navigate("/login");
  }, []);

  return (
    <div className="flex max-[600px]:flex-col h-screen">
      {/* Hamburger Menu for Mobile */}
      <button
        className="p-4 text-black rounded focus:outline-none md:hidden"
        onClick={toggleSidebar}
      >
        {!isOpen ? <GiHamburgerMenu /> : <RxCross1 />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-full bg-[#0A3981] text-white shadow-md transform transition-transform duration-300 md:relative md:w-64 ${
          isOpen ? "translate-y-0" : "-translate-y-full md:translate-y-0"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <div className="text-xl font-bold">Admin</div>
          <RxCross1
            onClick={toggleSidebar}
            className="cursor-pointer md:hidden"
          />
        </div>
        <hr />
        <ul className="mt-6 w-full flex flex-col">
          <Link
            className="p-4 hover:bg-gray-500 cursor-pointer"
            to={"/dashboard"}
            onClick={toggleSidebar}
          >
            Dashboard
          </Link>
          <Link
            className="p-4 hover:bg-gray-500 cursor-pointer"
            to={"/client"}
            onClick={toggleSidebar}
          >
            Clients
          </Link>
          <Link
            className="p-4 hover:bg-gray-500 cursor-pointer"
            to={"/projects"}
            onClick={toggleSidebar}
          >
            Projects
          </Link>
          <Link
            className="p-4 hover:bg-gray-500 cursor-pointer"
            to={"/payments"}
            onClick={toggleSidebar}
          >
            Payments
          </Link>
          <Link
            className="p-4 hover:bg-gray-500 cursor-pointer"
            to={"/expenses"}
            onClick={toggleSidebar}
          >
            Expenses
          </Link>
          <Link
            className="p-4 hover:bg-gray-500 cursor-pointer"
            to={"/employees"}
            onClick={toggleSidebar}
          >
            Employees
          </Link>
        </ul>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isOpen ? "mt-16" : "mt-0"
        } md:m-10`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminRoot;
