import React, { useState } from "react";
import { updateApplication } from "../services/api";
import { PopulatedApplication } from "../types/Application"; // Ensure to import User type
import { User } from "../types/User";

interface EditApplicationModalProps {
  application: PopulatedApplication;
  users: User[]; // Add users prop to allow selecting users
  onClose: () => void;
  onUpdate: (updatedApplication: PopulatedApplication) => void;
}

/**
 * @component EditApplicationModal
 * @description Modal component for editing an application.
 */
const EditApplicationModal: React.FC<EditApplicationModalProps> = ({ application, users, onClose, onUpdate }) => {
  const [userId, setUserId] = useState<string>(application.userId?._id || ""); // Update userId state
  const [income, setIncome] = useState<number>(application.income);
  const [expenses, setExpenses] = useState<number>(application.expenses);
  const [assets, setAssets] = useState<number>(application.assets);
  const [liabilities, setLiabilities] = useState<number>(application.liabilities);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedApplicationData = { userId, income, expenses, assets, liabilities };
    try {
      const updatedApplication = await updateApplication(application._id, updatedApplicationData);
      onUpdate(updatedApplication as PopulatedApplication); // Cast the result to PopulatedApplication
      onClose(); // Close the modal after update
    } catch (error) {
      console.error("Error updating application:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-1/3">
        <h2 className="text-2xl font-bold mb-4">Edit Application</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Selector */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="user">
              User
            </label>
            <select
              id="user"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
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

          {/* Income Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="income">
              Income
            </label>
            <input
              type="number"
              id="income"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          {/* Expenses Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="expenses">
              Expenses
            </label>
            <input
              type="number"
              id="expenses"
              value={expenses}
              onChange={(e) => setExpenses(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          {/* Assets Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="assets">
              Assets
            </label>
            <input
              type="number"
              id="assets"
              value={assets}
              onChange={(e) => setAssets(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          {/* Liabilities Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="liabilities">
              Liabilities
            </label>
            <input
              type="number"
              id="liabilities"
              value={liabilities}
              onChange={(e) => setLiabilities(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          {/* Modal Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditApplicationModal;
