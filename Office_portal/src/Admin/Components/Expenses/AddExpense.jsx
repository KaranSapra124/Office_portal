// src/components/AddExpense.js
import React, { useEffect, useState } from "react";
import Modal from "../Modals/Modal"; // Assuming you have a Modal component
import toast from "react-hot-toast";
import { postData } from "../../../Utils/commonMethods/postData";

const ExpenseForm = ({ isOpen, setIsOpen, editItem, isEdit, setData }) => {
  const [expenseData, setExpenseData] = useState({
    date: "",
    expenseName: "",
    expenseAmt: "",
    expenseCategory: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({
      ...expenseData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEdit) {
      const res = await fetch(
        `${import.meta.env.VITE_Backend_url}/admin/create-expense`,
        {
          method: "POST",
          body: JSON.stringify(expenseData),
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
      setExpenseData({
        date: "",
        expenseName: "",
        expenseAmt: "",
        expenseCategory: "",
        remarks: "",
      });
    } else {
      const data = await postData(
        `/admin/edit-expense/${editItem?._id}`,
        expenseData
      );
      //   console.log(data);
      setData((prev) => {
        const filteredData = prev?.filter(
          (elem) => elem?._id !== editItem?._id
        );
        return [...filteredData, data?.expenseData];
      });

      toast.success(data?.message);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isEdit) {
      setExpenseData(editItem);
    }
  }, [isEdit, editItem]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={setIsOpen}>
        <div className="max-w-md mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4 text-gray-700">
            {isEdit ? "Edit " : "Add "} Expense
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="date">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={expenseData.date}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="expenseName">
                Expense Name
              </label>
              <input
                type="text"
                id="expenseName"
                name="expenseName"
                value={expenseData.expenseName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="expenseAmt">
                Amount
              </label>
              <input
                type="number"
                id="expenseAmt"
                name="expenseAmt"
                value={expenseData.expenseAmt}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="expenseCategory">
                Category
              </label>
              <select
                id="expenseCategory"
                name="expenseCategory"
                value={expenseData.expenseCategory}
                onChange={handleChange}
                class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                {expenseCategories?.map((elem, index) => (
                  <option key={index} value={elem}>
                    {elem}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="remarks">
                Remarks
              </label>
              <textarea
                id="remarks"
                name="remarks"
                value={expenseData.remarks}
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

export default ExpenseForm;

const expenseCategories = ["Cheque", "Cash", "NEFT", "IMPS", "UPI", "RTGS"];
