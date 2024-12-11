// src/components/AddClient.js
import React, { useEffect, useState } from "react";
import Modal from "../Modals/Modal"; // Assuming you have a Modal component
import toast from "react-hot-toast";
import { postData } from "../../../Utils/commonMethods/postData";

const AddClient = ({ isOpen, setIsOpen, editItem, isEdit, setData }) => {
  const [clientData, setClientData] = useState({
    clientName: "",
    clientPhone: "",
    alterNatePhone: "",
    email: "",
    address: "",
    gstIn: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({
      ...clientData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEdit) {
      const res = await fetch(
        `${import.meta.env.VITE_Backend_url}/admin/create-client`,
        {
          method: "POST",
          body: JSON.stringify(clientData),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error while adding");
      } else {
        const data = await res.json();
        toast.success(data?.message);
      }
      // Reset form after submission
      setClientData({
        clientName: "",
        clientPhone: "",
        alterNatePhone: "",
        email: "",
        address: "",
        gstIn: "",
      });
    } else {
      const data = await postData(
        `/admin/edit-client/${editItem?._id}`,
        clientData
      );
      setData((prev) => {
        const filteredData = prev?.filter(
          (elem) => elem?._id !== editItem?._id
        );
        return [...filteredData, data?.adminData];
      });

      toast.success(data?.message);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isEdit) {
      setClientData(editItem);
    }
  }, [isEdit, editItem]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={setIsOpen}>
        <div className="max-w-md mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4 text-gray-700">
            {isEdit ? "Edit " : "Add "} Client
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="clientName">
                Client Name
              </label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={clientData.clientName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="clientPhone">
                Client Phone
              </label>
              <input
                type="number"
                id="clientPhone"
                name="clientPhone"
                value={clientData.clientPhone}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="alterNatePhone">
                Alternate Phone
              </label>
              <input
                type="number"
                id="alterNatePhone"
                name="alterNatePhone"
                value={clientData.alterNatePhone}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={clientData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="address">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={clientData.address}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="gstIn">
                GST IN
              </label>
              <input
                type="text"
                id="gstIn"
                name="gstIn"
                value={clientData.gstIn}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              />
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

export default AddClient;
