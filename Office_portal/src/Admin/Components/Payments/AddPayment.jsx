// src/components/PaymentForm.js
import React, { useEffect, useState } from "react";
import Modal from "../Modals/Modal";
import toast from "react-hot-toast";
import { postData } from "../../../Utils/commonMethods/postData";
import { RxCross1 } from "react-icons/rx";

const PaymentForm = ({ isOpen, setIsOpen, editItem, isEdit, setData }) => {
  const [paymentData, setPaymentData] = useState({
    clientName: "",
    project: "",
    transactionId: "",
    amount: "",
  });

  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEdit) {
      const res = await postData("/admin/create-payment", paymentData);
      if (!res.ok) {
        throw new Error("Error while adding");
      } else {
        const data = await res.json();
        toast.success(data?.message);
      }
      // Reset form after submission
      setPaymentData({
        clientName: "",
        project: "",
        transactionId: "",
        amount: "",
      });
    } else {
      const data = await postData(
        `/admin/edit-payment/${editItem?._id}`,
        paymentData
      );
      await fetchProjects();

      toast.success(data?.message);
      setIsOpen(false);
    }
  };
  const fetchProjects = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_Backend_url}/admin/get-projects`
    );
    const data = await res.json();
    setProjects(data?.projects);
  };
  useEffect(() => {
    const fetchClients = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_Backend_url}/admin/get-clients`
      );
      const data = await res.json();
      setClients(data?.clients);
    };

    fetchClients();
    fetchProjects();

    if (isEdit) {
      setPaymentData(editItem);
      console.log(editItem, "ITEMEMEMEM");
    }
  }, [isEdit]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={setIsOpen}>
        <div className="max-w-md mx-auto p-4">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-4 text-gray-700">
              {isEdit ? "Edit " : "Add "} Payment
            </h1>
            <RxCross1 onClick={() => setIsOpen(false)} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="clientName">
                Client Name
              </label>
              <select
                id="clientName"
                name="clientName"
                value={paymentData.clientName._id} // Use the client ID directly
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
              >
                <option value="">Select Client</option>
                {clients.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.clientName}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="project">
                Project
              </label>
              <select
                id="project"
                name="project"
                value={paymentData.project._id}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.projectId}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="transactionId">
                Transaction ID
              </label>
              <input
                type="text"
                id="transactionId"
                name="transactionId"
                value={paymentData.transactionId}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="amount">
                Amount
              </label>
              <input
                type="text"
                id="amount"
                name="amount"
                value={paymentData.amount}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
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

export default PaymentForm;
