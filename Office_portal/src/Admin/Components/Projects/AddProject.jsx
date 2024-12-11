// src/components/ClientForm.js
import React, { useEffect, useState } from "react";
import Modal from "../Modals/Modal";
import toast from "react-hot-toast";
import { postData } from "../../../Utils/commonMethods/postData";
import { RxCross1 } from "react-icons/rx";

const AddProjectForm = ({ isOpen, setIsOpen, editItem, isEdit, setData }) => {
  const [clients, setClients] = useState([]);
  const [clientData, setClientData] = useState({
    clientName: "", // This will be a dropdown
    startDate: "",
    images: [],
    projectId: "",
    TotalCost: "",
    // Milestones: [],
    status: "Active", // Default status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({
      ...clientData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    console.log(files);
    setClientData((prev) => ({
      ...prev,
      images: [...files], // Store image URLs for preview
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const formData = new FormData();
    // console.log(
    //   clientData,
    //   clients?.find(
    //     (elem) => elem.clientName === clientData?.clientName?.clientName
    //   )?._id
    // );
    formData.append("clientName", clientData?.clientName);
    formData.append("startDate", clientData.startDate);
    formData.append("projectId", clientData.projectId);
    formData.append("TotalCost", clientData.TotalCost);
    formData.append("status", clientData.status);

    // Append each image file to the FormData
    clientData.images.forEach((image) => {
      formData.append("images", image); // Use the same key for multiple files
    });

    if (!isEdit) {
      const res = await fetch(
        `${import.meta.env.VITE_Backend_url}/admin/create-project`,
        {
          method: "POST",
          body: formData, // Send the FormData directly
          credentials: "include",
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
        startDate: "",
        images: [],
        projectId: "",
        TotalCost: "",
        status: "Active",
      });
    } else {
      // Handle the edit case
      const res = await fetch(
        `${import.meta.env.VITE_Backend_url}/admin/edit-project/${
          editItem?._id
        }`,
        {
          method: "POST",
          body: formData, // Send the FormData directly
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw new Error("Error while adding");
      } else {
        const data = await res.json();
        // toast.success(data?.message);
        setData((prev) => {
          const filteredData = prev?.filter(
            (elem) => elem?._id !== editItem?._id
          );
          return [...filteredData, data?.newProject];
        });
        toast.success(data?.message);
        setIsOpen(false);
      }
    }
  };

  useEffect(() => {
    if (isEdit) {
      setClientData(editItem);
      console.log(isEdit);
    }
  }, [isEdit, editItem]);

  useEffect(() => {
    const fetchClients = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_Backend_url}/admin/get-clients`
      );
      const data = await res.json();
      setClients(data?.clients);
    };
    fetchClients();
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={setIsOpen}>
        <div className="max-w-md mx-auto p-4">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-4 text-gray-700">
              {isEdit ? "Edit " : "Add "} Project
            </h1>
            <RxCross1 onClick={() => setIsOpen(false)} />
          </div>
          <form onSubmit={handleSubmit}>
            {/* Client Name Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="clientName">
                Client Name
              </label>
              <select
                id="clientName"
                name="clientName"
                value={clientData.clientName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select Client
                </option>
                {clients?.length > 0 ? (
                  clients?.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client.clientName}
                    </option>
                  ))
                ) : (
                  <>
                    <option>No Clients Yet</option>
                  </>
                )}
              </select>
            </div>

            {/* Start Date */}
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="startDate">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={clientData.startDate}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            {/* Images Upload */}
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="images">
                Project Images
              </label>
              <input
                type="file"
                id="images"
                name="images"
                onChange={handleImageChange}
                multiple
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            {editItem?.images?.length > 0 && (
              <div className="flex flex-wrap">
                {editItem?.images?.map((elem) => (
                  <img
                    className="w-28 m-2"
                    src={`${
                      import.meta.env.VITE_Backend_url
                    }/admin/get-image/${elem}`}
                  />
                ))}
              </div>
            )}

            {/* Project ID */}
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="projectId">
                Project ID
              </label>
              <input
                type="text"
                id="projectId"
                name="projectId"
                value={clientData.projectId}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            {/* Total Cost */}
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="TotalCost">
                Total Cost
              </label>
              <input
                type="number"
                id="TotalCost"
                name="TotalCost"
                value={clientData.TotalCost}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            {/* Milestones */}
           

            {/* Status Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={clientData.status}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
              >
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Discontinued">Discontinued</option>
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

export default AddProjectForm;
