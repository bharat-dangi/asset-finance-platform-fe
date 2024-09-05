import React, { useState } from "react";
import { createUser } from "../services/api";
import { User } from "../types/User";

/**
 * @component UserForm
 * @description Form component to create or update users.
 */
const UserForm: React.FC<{ onFormSubmit: () => void }> = ({ onFormSubmit }) => {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>(""); // Change state type to string
  const [address, setAddress] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ageNumber = age ? parseInt(age, 10) : 0; // Convert age to a number if not empty
    const newUser: Partial<User> = { name, age: ageNumber, address };
    try {
      const createdUser = await createUser(newUser);
      console.log("User created:", createdUser);
      onFormSubmit(); // Call the callback after successful submission
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md space-y-4">
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="age">
          Age
        </label>
        <input
          type="number"
          id="age"
          value={age} // Use the string value for the input
          onChange={(e) => setAge(e.target.value)} // Allow empty string
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="address">
          Address
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full">
        Submit
      </button>
    </form>
  );
};

export default UserForm;
