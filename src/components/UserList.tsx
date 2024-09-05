import React from "react";
import { User } from "../types/User";

/**
 * @component UserList
 * @description Component to display a list of users.
 */
const UserList: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <table className="min-w-full border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-6 py-2 text-left text-gray-600 font-semibold">Name</th>
          <th className="px-6 py-2 text-left text-gray-600 font-semibold">Age</th>
          <th className="px-6 py-2 text-left text-gray-600 font-semibold">Address</th>
        </tr>
      </thead>
      <tbody>
        {users?.length > 0 &&
          users?.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="px-6 py-2">{user.name}</td>
              <td className="px-6 py-2">{user.age}</td>
              <td className="px-6 py-2">{user.address}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default UserList;
