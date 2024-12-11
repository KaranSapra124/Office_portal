// src/components/EmployeeTable.js
import React, { useEffect, useState } from "react";
import AddEmployeeForm from "./AddEmployeeTable"; // Assume you have a form component for adding/editing employees
import { postData } from "../../../Utils/commonMethods/postData"; // Adjust the import path as necessary
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa"; // Import an eye icon for viewing details

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleDelete = async (id) => {
    const response = await postData(`/admin/delete-employee/${id}`, {});
    if (response?.success) {
      setEmployees((prev) => prev.filter((employee) => employee._id !== id));
      toast.success(response?.message);
    } else {
      toast.error(response?.message || "Failed to delete employee");
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_Backend_url}/admin/get-employees`
      );
      const data = await res.json();
      setEmployees(data?.employees);
    };
    fetchEmployees();
  }, []);

  return (
    <>
      {isOpen && (
        <AddEmployeeForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          editItem={editItem}
          isEdit={isEdit}
          setData={setEmployees}
        />
      )}
      <div className="overflow-x-auto p-4 bg-gray-50 rounded-lg shadow-md ">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-700">Employees Data</h1>
          <button
            onClick={() => {
              setIsOpen(true);
              setEditItem(null);
              setIsEdit(false);
            }}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Add New
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Email</th>
                <th className="py-3 px-4 border-b">Phone Number</th>
                <th className="py-3 px-4 border-b">Designation</th>
                {/* <th className="py-3 px-4 border-b">Aadhar Card</th> */}
                <th className="py-3 px-4 border-b">Employee Pic</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr
                    key={employee._id}
                    className="hover:bg-gray-100 transition duration-200"
                  >
                    <td className="py-2 px-4 border-b text-center border-r-2">
                      {employee.Name}
                    </td>
                    <td className="py-2 px-4 border-b text-center border-r-2">
                      {employee.Email}
                    </td>
                    <td className="py-2 px-4 border-b text-center border-r-2">
                      {employee.phoneNumber}
                    </td>
                    <td className="py-2 px-4 border-b text-center border-r-2">
                      {employee.designation}
                    </td>
                    {/* <td className="py-2 px-4 border-b text-center border-r-2">
                      {employee.employeeDocuments.aadharCard}
                    </td>
                    <td className="py-2 px-4 border-b text-center border-r-2">
                      {employee.employeeDocuments.panCard}
                    </td> */}
                    <td className="py-2 px-4 border-b text-center border-r-2">
                      {/* {console.log(employee?.employeeDocuments?.employeePic)} */}
                      <img className="w-[5rem]"
                        src={`${
                          import.meta.env.VITE_Backend_url
                        }/admin/get-image/${
                          employee?.employeeDocuments?.aadharCard
                        }`}
                        alt=""
                        srcset=""
                      />
                    </td>
                    <td className="py-2 px-4 my-auto items-center flex space-x-2">
                      <button
                        onClick={() => {
                          setEditItem(employee);
                          setIsEdit(true);
                          setIsOpen(true);
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(employee._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 px-4 text-center">
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

export default EmployeeTable;
