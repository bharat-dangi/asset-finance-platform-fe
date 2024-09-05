import React, { useState } from "react";
import { createUser } from "../services/api";
import { User } from "../types/User";

/**
 * @component UserFormModal
 * @description Modal component to create a new user.
 */
const UserFormModal: React.FC<{ onClose: () => void; onFormSubmit: () => void }> = ({ onClose, onFormSubmit }) => {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number | "">("");
  const [address, setAddress] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!name || !age || !address) {
      alert("Please fill in all fields.");
      return;
    }

    const newUser: Omit<User, "_id"> = { name, age: Number(age), address };
    try {
      const createdUser = await createUser(newUser);
      console.log("User created:", createdUser);
      onFormSubmit(); // Call the callback after successful submission
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Add New User</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Age input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="age">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Address input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="address">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              required
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

export default UserFormModal;
