import React from "react";

const Dashboard = () => {
  return (
    <>
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold">
          Welcome to the Admin Dashboard
        </h1>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-bold">Total Users</h2>
            <p className="text-2xl">1,234</p>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-bold">Active Users</h2>
            <p className="text-2xl">987</p>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-bold">New Signups</h2>
            <p className="text-2xl">45</p>
          </div>
        </div>

        {/* User Data Table */}
        {/* <div className="mt-6">
          <h2 className="text-xl font-bold">User Data</h2>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample Data */}
                {/* {Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">User {index + 1}</td>
                    <td className="py-2 px-4 border-b">
                      user{index + 1}@example.com
                    </td>
                    <td className="py-2 px-4 border-b">Active</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */} 
      </div>
    </>
  );
};

export default Dashboard;
