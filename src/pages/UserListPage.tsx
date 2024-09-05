import React, { useState, useEffect } from "react";
import { getUsers } from "../services/api";
import { User } from "../types/User";
import UserFormModal from "../components/UserFormModal";

/**
 * @component UserListPage
 * @description Component to display a list of users and add new users.
 */
const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleFormSubmit = () => {
    fetchUsers(); // Refresh the user list after adding a new user
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-blue-600">User List</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Add New User
        </button>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-gray-600 font-semibold">Name</th>
            <th className="px-6 py-3 text-left text-gray-600 font-semibold">Age</th>
            <th className="px-6 py-3 text-left text-gray-600 font-semibold">Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.age}</td>
              <td className="px-6 py-4">{user.address}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add User Modal */}
      {isModalOpen && <UserFormModal onClose={() => setIsModalOpen(false)} onFormSubmit={handleFormSubmit} />}
    </div>
  );
};

export default UserListPage;
