import React, { useCallback, useEffect, useState } from "react";
import { getApplications, getUsers, deleteApplication } from "../services/api";
import { PopulatedApplication } from "../types/Application";
import EditApplicationModal from "../components/EditApplicationModal";
import { User } from "../types/User";

/**
 * @component ApplicationList
 * @description Component to list all finance applications and provide update functionality.
 */
const ApplicationList: React.FC<{
  shouldRefresh: boolean;
  setShouldRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ shouldRefresh, setShouldRefresh }) => {
  const [applications, setApplications] = useState<PopulatedApplication[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<PopulatedApplication | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // Added loading state

  // Use useCallback to memoize fetchApplications
  const fetchApplications = useCallback(async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const apps = await getApplications();
      setApplications(apps);
      setLoading(false); // Set loading to false after data is fetched
      setShouldRefresh(false); // Reset refresh flag after fetching data
    } catch (error) {
      console.error("Error fetching applications:", error);
      setLoading(false); // Ensure loading is set to false if there's an error
    }
  }, [setShouldRefresh]); // Empty dependency array, as no external dependencies are used

  useEffect(() => {
    if (shouldRefresh && !loading) {
      fetchApplications();
    }
  }, [shouldRefresh, loading, fetchApplications]); // Fetch applications on load or when shouldRefresh changes

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
  }, []);

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
      setApplications(applications.filter((app) => app._id !== applicationId));
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  const handleUpdate = (updatedApplication: PopulatedApplication) => {
    setApplications(applications.map((app) => (app._id === updatedApplication._id ? updatedApplication : app)));
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Applications List</h2>

      {loading ? ( // Show loading spinner while fetching data
        <div className="text-center">Loading applications...</div>
      ) : (
        <div className="overflow-x-auto">
          {/* Make the table container scrollable on small screens */}
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">User Name</th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">User Age</th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">User Address</th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">Income</th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">Expenses</th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">Assets</th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">Liabilities</th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="border-b">
                  <td className="px-4 py-2">{app.userId?.name ?? ""}</td>
                  <td className="px-4 py-2">{app.userId?.age ?? ""}</td>
                  <td className="px-4 py-2">{app.userId?.address ?? ""}</td>
                  <td className="px-4 py-2">{app.income}</td>
                  <td className="px-4 py-2">{app.expenses}</td>
                  <td className="px-4 py-2">{app.assets}</td>
                  <td className="px-4 py-2">{app.liabilities}</td>
                  <td className="px-4 py-2">
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
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedApplication && (
        <EditApplicationModal
          application={selectedApplication}
          users={users}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ApplicationList;
