// src/components/ClientTable.js
import React, { useEffect, useState } from "react";
import AddProjectForm from "./AddProject";
import { postData } from "../../../Utils/commonMethods/postData";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa"; // Import an eye icon for viewing milestones
import MilestonesTable from "./MilestonesTable";

const ProjectTable = () => {
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [editItem, setEditItem] = useState([]);
  const [projectId, setProjectId] = useState(0);
  const [milestones, setMilestones] = useState([]);

  const handleDelete = async (id) => {
    const response = await postData(`/admin/delete-project/${id}`, {});
    setData((prev) => prev.filter((elem) => elem._id !== id));
    toast.success(response?.message);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_Backend_url}/admin/get-projects`
      );
      const data = await res.json();
      setData(data?.projects);
    };
    fetchProjects();
  }, []);

  return (
    <>
      {isModal && (
        <MilestonesTable
          projectId={projectId}
          isOpen={isModal}
          setIsOpen={setIsModal}
          milestonesData={milestones}
        />
      )}
      {isOpen && (
        <AddProjectForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          editItem={null}
          isEdit={false}
          setData={setData}
        />
      )}
      {isEdit && (
        <AddProjectForm
          isOpen={isEdit}
          setIsOpen={setIsEdit}
          editItem={editItem}
          isEdit={true}
          setData={setData}
        />
      )}
      <div className="overflow-x-auto p-4 bg-gray-50 rounded-lg shadow-md">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-700">Projects Data</h1>
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
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Images</th>
                <th className="py-3 px-4 border-b">Start Date</th>
                <th className="py-3 px-4 border-b">Project Id</th>
                <th className="py-3 px-4 border-b">Status</th>
                <th className="py-3 px-4 border-b">Milestones</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-100 transition duration-200"
                  >
                    <td className="py-2 px-4 border-b text-center border-r-2">
                      {item?.clientName?.clientName}
                    </td>
                    <td className="flex justify-center py-2 px-4 border-b border-r-2">
                      {/* {console.log(item?.images,'ELELELEM')} */}
                      {item?.images?.map((elem, index) => (
                        <img
                          key={index}
                          className="w-20 h-20 max-[600px]:w-10 max-[600px]:h-10 object-cover mx-1"
                          src={`${
                            import.meta.env.VITE_Backend_url
                          }/admin/get-image/${elem}`}
                          alt={`Project Image ${index + 1}`}
                        />
                      ))}
                    </td>
                    <td className="py-2 px-4 border-b text-center border-r-2">
                      {item.startDate}
                    </td>
                    <td className="py-2 px-4 border-b text-center border-r-2">
                      {item.projectId}
                    </td>
                    <td className="py-2 px-4 border-b text-center border-r-2">
                      {item?.status}
                    </td>
                    <td className="py-2 px-4 border-b text-center border-r-2">
                      <button
                        onClick={() => {
                          setIsModal(true);
                          setProjectId(item?._id);
                          setMilestones(item?.milestones);
                        }}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEye />
                      </button>
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

export default ProjectTable;
