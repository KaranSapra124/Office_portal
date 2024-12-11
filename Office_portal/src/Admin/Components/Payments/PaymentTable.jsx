// src/components/PaymentTable.js
import React, { useEffect, useState } from "react";
import { postData } from "../../../Utils/commonMethods/postData";
import toast from "react-hot-toast";
import PaymentForm from "./AddPayment";

const PaymentTable = () => {
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleDelete = async (id) => {
    const response = await postData(`/admin/delete-payment/${id}`, {});
    setData((prev) => prev.filter((elem) => elem._id !== id));
    toast.success(response?.message);
  };

  useEffect(() => {
    const fetchPayments = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_Backend_url}/admin/get-payments`
      );
      const data = await res.json();
      setData(data?.payments);
    };
    fetchPayments();
  }, []);

  return (
    <>
      {isOpen && (
        <PaymentForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          editItem={null}
          isEdit={false}
          setData={setData}
        />
      )}
      {isEdit && (
        <PaymentForm
          isOpen={isEdit}
          setIsOpen={setIsEdit}
          editItem={editItem}
          isEdit={true}
          setData={setData}
        />
      )}
      <div className="overflow-x-auto p-4 bg-gray-50 rounded-lg shadow-md">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-700">Payments Data</h1>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Add New
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-3 px-4 border-b">Client Name</th>
                <th className="py-3 px-4 border-b">Project</th>
                <th className="py-3 px-4 border-b">Transaction ID</th>
                <th className="py-3 px-4 border-b">Amount</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-100 transition duration-200">
                    <td className="py-2 px-4 border-b text-center border-r-2">
                      {item.clientName?.clientName}
                    </td>
                    <td className="py-2 px-4 border-b text-center border-r-2">
                      {item.project?.projectId}
                    </td>
                    <td className="py-2 px-4 border-b text-center border-r-2">
                      {item.transactionId}
                    </td>
                    <td className="py-2 px-4 border-b text-center border-r-2">
                      {item.amount}
                    </td>
                    <td className="py-2 px-4 border-b flex justify-center space-x-2">
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
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 px -4 text-center">
                    <h1 className="text-3xl font-semibold text-gray-700 p-4 rounded-lg">
                      No Data Found!
                    </h1>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PaymentTable;