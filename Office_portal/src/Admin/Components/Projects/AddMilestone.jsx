import React, { useEffect, useState } from "react";
import Modal from "../Modals/Modal";
import { postData } from "../../../Utils/commonMethods/postData";
import toast from "react-hot-toast";

const AddMilestone = ({ isClose, setIsClose, projectId, isEdit, editItem }) => {
  const [milestoneDate, setMilestoneDate] = useState("");
  const [amount, setAmount] = useState("");
  const [hasGst, setHasGst] = useState(false);
  const [gstPercent, setGstPercent] = useState("");
  console.log(isClose);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMilestone = {
      milestoneDate,
      amount,
      hasGst,
      gstPercent: hasGst ? gstPercent : null, // Set gstPercent to null if hasGst is false
    };

    try {
      if (!isEdit) {
        console.log(newMilestone, projectId);
        const response = await postData(
          `/admin/add-milestone/${projectId}`,
          newMilestone
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Optionally, reset the form or redirect the user
        setMilestoneDate("");
        setAmount("");
        setHasGst(false);
        setGstPercent("");
        alert("Milestone added successfully!");
      } else {
        console.log(newMilestone, projectId);
        const data = await postData(
          `/admin/edit-milestone/${editItem?._id}`,
          newMilestone
        );

        console.log(data);
        // Optionally, reset the form or redirect the user
        setMilestoneDate("");
        setAmount("");
        setHasGst(false);
        setGstPercent("");
        setIsClose(false);
        toast.success(data?.message);
      }
    } catch (error) {
      console.error("Error adding milestone:", error);
      alert("Failed to add milestone.");
    }
  };
  useEffect(() => {
    if (editItem) {
      setMilestoneDate(editItem?.milestoneDate);
      setAmount(editItem?.amount);
      setHasGst(editItem?.hasGst);
      setGstPercent(editItem?.gstPercent);
    }
  }, [editItem]);

  return (
    <Modal
      isOpen={isClose}
      onClose={setIsClose}
      className={
        "fixed inset-0 flex items-center justify-center z-[999]  bg-black bg-opacity-50"
      }
    >
      <div className=" mx-auto m-2   z-[999] rounded-lg">
        {/* {projectId} */}
       <div className="flex justify-between items-center">
 <h2 className="text-xl font-semibold mb-4">Add Milestone</h2>
         <button className="bg-red-500 p-5 rounded" onClick={()=>setIsClose(false)}>Close</button>
       </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="milestoneDate">
              Milestone Date
            </label>
            <input
              type="date"
              id="milestoneDate"
              value={milestoneDate}
              onChange={(e) => setMilestoneDate(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="amount">
              Amount
            </label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="hasGst">
              Has GST
            </label>
            <input
              type="checkbox"
              id="hasGst"
              checked={hasGst}
              onChange={(e) => setHasGst(e.target.checked)}
              className="mr-2"
            />
          </div>
          {hasGst && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="gstPercent">
                GST Percent
              </label>
              <input
                type="text"
                id="gstPercent"
                value={gstPercent}
                onChange={(e) => setGstPercent(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Milestone
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddMilestone;
