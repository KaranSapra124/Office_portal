import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import setCookie from "../../../Utils/cookieMethod";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const Naviagte = useNavigate();
  // State variables for email and password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    const data = {
      email: formData.email,
      password: formData.password,
    };
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_Backend_url}/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specify the content type
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) {
        throw new Error("Network Response Was Not Ok");
      } else {
        const result = await res.json();
        toast.success(result?.message, {
          className: "text-xl max-[600px]:text-sm",
        });
        // console.log(result);
        {
          result?.token && setCookie("adminToken", result?.token, 10);
        }
        Naviagte("/dashboard")
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Handle change for both email and password
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field based on the name
    }));
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_Backend_url}/admin/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Specify the content type
            },
            credentials: "include",
            body: JSON.stringify({}),
          }
        );
        if (!res.ok) {
          throw new Error("Network Response Was Not Ok");
        } else {
          const result = await res.json();
          toast.success(result?.message, {
            className: "text-xl max-[600px]:text-sm",
          });
          // console.log(result);
          {
            result?.token && setCookie("adminToken", result?.token, 10);
          }
          Naviagte("/dashboard");
        }
      } catch (err) {
        console.log(err);
      }

    };
    fetchUser()
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email" // Set name attribute
              required
              value={formData.email}
              onChange={handleChange} // Use the single onChange handler
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password" // Set name attribute
              required
              value={formData.password}
              onChange={handleChange} // Use the single onChange handler
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-[#0A3981] rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
        {/* <div className="text-center">
          <span className="text-sm text-gray-600">
            Don't have an account?
          </span>
          <button className="ml-2 text-blue-600 hover:underline">
            Sign Up
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Auth;
