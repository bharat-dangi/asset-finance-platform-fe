import React, { useState, useEffect } from "react";
import { createApplication, getUsers } from "../services/api";
import { Application } from "../types/Application";
import { User } from "../types/User";

/**
 * @component ApplicationFormModal
 * @description Modal component to create a new finance application.
 */
const ApplicationFormModal: React.FC<{ onClose: () => void; onFormSubmit: () => void }> = ({
  onClose,
  onFormSubmit,
}) => {
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [assets, setAssets] = useState<number>(0);
  const [liabilities, setLiabilities] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");

  // Fetch users from API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newApplication: Omit<Application, "_id"> = {
      userId: selectedUser,
      income,
      expenses,
      assets,
      liabilities,
    };
    try {
      const createdApp = await createApplication(newApplication);
      console.log("Application created:", createdApp);
      onFormSubmit(); // Call the callback after successful submission
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error creating application:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Create Application</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="user">
              User
            </label>
            <select
              id="user"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled>
                Select a user
              </option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Income input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="income">
              Income
            </label>
            <input
              type="number"
              id="income"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Expenses input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="expenses">
              Expenses
            </label>
            <input
              type="number"
              id="expenses"
              value={expenses}
              onChange={(e) => setExpenses(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Assets input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="assets">
              Assets
            </label>
            <input
              type="number"
              id="assets"
              value={assets}
              onChange={(e) => setAssets(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Liabilities input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="liabilities">
              Liabilities
            </label>
            <input
              type="number"
              id="liabilities"
              value={liabilities}
              onChange={(e) => setLiabilities(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplicationFormModal;
