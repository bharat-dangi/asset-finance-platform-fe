import React, { useEffect, useState } from "react";
import { getApplications, getUsers, deleteApplication } from "../services/api";
import { PopulatedApplication } from "../types/Application";
import EditApplicationModal from "../components/EditApplicationModal";
import { User } from "../types/User";

/**
 * @component ApplicationList
 * @description Component to list all finance applications and provide update functionality.
 */
const ApplicationList: React.FC = () => {
  const [applications, setApplications] = useState<PopulatedApplication[]>([]);
  const [users, setUsers] = useState<User[]>([]); // State for users
  const [selectedApplication, setSelectedApplication] = useState<PopulatedApplication | null>(null); // State for selected application to edit
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false); // State to control modal visibility

  useEffect(() => {
    fetchApplications();
    fetchUsers(); // Fetch users when the component mounts
  }, []);

  const fetchApplications = async () => {
    try {
      const apps = await getApplications();
      setApplications(apps);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (applicationId: string) => {
    try {
      await deleteApplication(applicationId);
      // Update state to remove the deleted application
      setApplications(applications.filter((app) => app._id !== applicationId));
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  const handleUpdate = (updatedApplication: PopulatedApplication) => {
    // Update the state with the updated application
    setApplications(applications.map((app) => (app._id === updatedApplication._id ? updatedApplication : app)));
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Applications</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-6 py-2 text-left text-gray-600 font-semibold">User Name</th>
            <th className="px-6 py-2 text-left text-gray-600 font-semibold">User Age</th>
            <th className="px-6 py-2 text-left text-gray-600 font-semibold">User Address</th>
            <th className="px-6 py-2 text-left text-gray-600 font-semibold">Income</th>
            <th className="px-6 py-2 text-left text-gray-600 font-semibold">Expenses</th>
            <th className="px-6 py-2 text-left text-gray-600 font-semibold">Assets</th>
            <th className="px-6 py-2 text-left text-gray-600 font-semibold">Liabilities</th>
            <th className="px-6 py-2 text-left text-gray-600 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id} className="border-b">
              <td className="px-6 py-2">{app.userId?.name ?? ""}</td>
              <td className="px-6 py-2">{app.userId?.age ?? ""}</td>
              <td className="px-6 py-2">{app.userId?.address ?? ""}</td>
              <td className="px-6 py-2">{app.income}</td>
              <td className="px-6 py-2">{app.expenses}</td>
              <td className="px-6 py-2">{app.assets}</td>
              <td className="px-6 py-2">{app.liabilities}</td>
              <td className="px-6 py-2">
                <button
                  onClick={() => handleDelete(app._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setSelectedApplication(app);
                    setIsEditModalOpen(true);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isEditModalOpen && selectedApplication && (
        <EditApplicationModal
          application={selectedApplication}
          users={users} // Pass users to the modal
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ApplicationList;
