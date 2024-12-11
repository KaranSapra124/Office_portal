import React, { useEffect, useState } from "react";
// import axios from "axios";
import Modal from "../Modals/Modal";
import AddMilestone from "./AddMilestone";
import { postData } from "../../../Utils/commonMethods/postData";
import toast from "react-hot-toast";

const MilestonesTable = ({ isOpen, setIsOpen, projectId, milestonesData }) => {
  console.log(milestonesData)
  const [milestones, setMilestones] = useState(milestonesData);
  const [editItem, setEditItem] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  // const handleEdit = (id) => {
  //   console.log(id);
  //   setIsEdit(true);
  //   // Implement edit functionality (e.g., open a modal or navigate to an edit page)
  //   setEditItem(id);
  // };

  const handleDelete = async (id) => {
    try {
      const data = await postData(`/admin/delete-milestone/${projectId}/${id}`);
      toast.success(data?.message);
      setIsOpen(false);
    } catch (error) {
      console.error("Error deleting milestone:", error);
    }
  };

  return (
    <>
      {isAdd && (
        <AddMilestone
          setIsClose={setIsAdd}
          isClose={isAdd}
          projectId={projectId}
          editItem={null}
          isEdit={null}
        />
      )}
      {isEdit && (
        <AddMilestone
          setIsClose={setIsEdit}
          isClose={isEdit}
          projectId={projectId}
          editItem={editItem}
          isEdit={isEdit}
        />
      )}
      <Modal isOpen={isOpen} onClose={setIsOpen}>
        {/* {projectId} */}
        <div className="overflow-x-auto ">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-4 text-gray-700">
              Projects Data
            </h1>
            <button
              onClick={() => setIsAdd(true)}
              className="bg-blue-600 text-white p-2 rounded m-2"
            >
              Add New
            </button>
             <button
              onClick={() => setIsOpen(false)}
              className="bg-red-600  text-white p-2 rounded m-2"
            >
              Close
            </button>
          </div>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-blue-600  text-gray-200 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Milestone Date</th>
                <th className="py-3 px-6 text-left">Amount</th>
                <th className="py-3 px-6 text-left">Has GST</th>
                <th className="py-3 px-6 text-left">GST Percent</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {milestones && milestones?.length > 0 ? milestones?.map((milestone) => (
                <tr
                  key={milestone._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">{milestone.milestoneDate}</td>
                  <td className="py-3 px-6">
                    {milestone?.hasGst
                      ? +milestone?.amount +
                        (milestone?.amount * milestone?.gstPercent) / 100
                      : milestone?.amount}
                  </td>
                  <td className="py-3 px-6">
                    {milestone.hasGst ? "Yes" : "No"}
                  </td>
                  <td className="py-3 px-6">{milestone?.gstPercent}</td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => {
                        console.log(milestone);
                        setIsEdit(true);
                        // Implement edit functionality (e.g., open a modal or navigate to an edit page)
                        setEditItem(milestone);
                      }}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(milestone._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )):<>
              <h1 className="text-center font-bold">No Data Found!</h1>
              </>}
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  );
};

export default MilestonesTable;
