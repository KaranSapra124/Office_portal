// src/components/ExpenseTable.js
import React, { useEffect, useState } from "react";
import { postData } from "../../../Utils/commonMethods/postData";
import toast from "react-hot-toast";
import ExpenseForm from "./AddExpense"; // Assuming you have a form component for adding/editing expenses

const ExpenseTable = () => {
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleDelete = async (id) => {
    const response = await postData(`/admin/delete-expense/${id}`, {});
    setData((prev) => prev.filter((elem) => elem._id !== id));
    toast.success(response?.message);
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_Backend_url}/admin/get-expenses`
      );
      const data = await res.json();
      setData(data?.expenses);
    };
    fetchExpenses();
  }, []);

  return (
    <>
      {isOpen && (
        <ExpenseForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          editItem={null}
          isEdit={false}
          setData={setData}
        />
      )}
      {isEdit && (
        <ExpenseForm
          isOpen={isEdit}
          setIsOpen={setIsEdit}
          editItem={editItem}
          isEdit={true}
          setData={setData}
        />
      )}
      <div className="overflow-x-auto p-4 bg-gray-50 rounded-lg h-lvh shadow-md">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4 text-gray-700">
            Expenses Data
          </h1>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 text-white p-2 rounded m-2"
          >
            Add New
          </button>
        </div>
        <table className="w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-4 border-b">Date</th>
              <th className="py-3 px-4 border-b">Expense Name</th>
              <th className="py-3 px-4 border-b">Amount</th>
              <th className="py-3 px-4 border-b">Category</th>
              <th className="py-3 px-4 border-b">Remarks</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <td className="py-2 px-4 border-b text-center border-r-2">
                    {item.date}
                  </td>
                  <td className="py-2 px-4 border-b text-center border-r-2">
                    {item.expenseName}
                  </td>
                  <td className="py-2 px-4 border-b text-center border-r-2">
                    {item.expenseAmt}
                  </td>
                  <td className="py-2 px-4 border-b text-center border-r-2">
                    {item.expenseCategory}
                  </td>
                  <td className="py-2 px-4 border-b text-center border-r-2">
                    {item.remarks}
                  </td>
                  <td className="py-2 px-4 border-b flex space-x-2">
                    <button
                      onClick={() => {
                        setEditItem(item);
                        setIsEdit(true);
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover .bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 px-4 text-center">
                  <div className="flex items-center justify-center ">
                    <h1 className="text-3xl font-semibold text-gray-700 p-4 rounded-lg ">
                      No Data Found!
                    </h1>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ExpenseTable;
