// src/components/AddEmployeeForm.js
import React, { useEffect, useState } from "react";
import Modal from "../Modals/Modal";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";

const AddEmployeeForm = ({ isOpen, setIsOpen, editItem, isEdit, setData }) => {
  const [employeeData, setEmployeeData] = useState({
    Name: "",
    Email: "",
    phoneNumber: "",
    designation: "",
    aadharCard: null,
    panCard: null,
    profilePic: null,
    status: "Active", // Default status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: files[0], // Store the first selected file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const formData = new FormData();
    Object.keys(employeeData).forEach((key) => {
      console.log(employeeData);
      formData.append(key, employeeData[key]);
    });

    const res = await fetch(
      `${import.meta.env.VITE_Backend_url}/admin/${
        isEdit ? `edit-employee/${editItem._id}` : "create-employee"
      }`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error("Error while saving employee data");
    } else {
      const data = await res.json();
      toast.success(data?.message);
      setData((prev) => {
        if (isEdit) {
          return prev.map((emp) =>
            emp._id === editItem._id ? data.newEmployee : emp
          );
        } else {
          return [...prev, data.newEmployee];
        }
      });
      setIsOpen(false);
    }
  };
  useEffect(() => console.log(employeeData), [employeeData]);
  useEffect(() => {
    if (isEdit) {
      setEmployeeData(editItem);
    }
  }, [isEdit]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={setIsOpen}>
        <div className="max-w-md mx-auto p-4 h-[30rem] overflow-y-scroll">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-4 text-gray-700">
              {isEdit ? "Edit " : "Add "} Employee
            </h1>
            <RxCross1 onClick={() => setIsOpen(false)} />
          </div>
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="Name"
                value={employeeData.Name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="Email"
                value={employeeData.Email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={employeeData.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            {/* Designation */}
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="designation">
                Designation
              </label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={employeeData.designation}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            {/* Aadhar Card Upload */}
            {!isEdit && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="aadharCard">
                    Aadhar Card
                  </label>
                  <input
                    type="file"
                    id="aadharCard"
                    name="aadharCard"
                    onChange={handleFileChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                    required
                  />
                  {employeeData?.employeeDocuments?.aadharCard && (
                    <img
                      className="w-32"
                      src={`${
                        import.meta.env.VITE_Backend_url
                      }/admin/get-image/${
                        employeeData?.employeeDocuments?.aadharCard
                      }`}
                    />
                  )}
                </div>
                {/* PAN Card Upload */}
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="panCard">
                    PAN Card
                  </label>
                  <input
                    type="file"
                    id="panCard"
                    name="panCard"
                    onChange={handleFileChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                    required
                  />
                  {employeeData?.employeeDocuments?.panCard && (
                    <img
                      className="w-32"
                      src={`${
                        import.meta.env.VITE_Backend_url
                      }/admin/get-image/${
                        employeeData?.employeeDocuments?.panCard
                      }`}
                    />
                  )}
                </div>
                {/* Profile Picture Upload */}
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="profilePic">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    id="profilePic"
                    name="profilePic"
                    onChange={handleFileChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                    required
                  />
                  {employeeData?.employeeDocuments?.employeePic && (
                    <img
                      className="w-32"
                      src={`${
                        import.meta.env.VITE_Backend_url
                      }/admin/get-image/${
                        employeeData?.employeeDocuments?.employeePic
                      }`}
                    />
                  )}
                </div>{" "}
              </>
            )}

            {/* Status Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={employeeData.status}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddEmployeeForm;
