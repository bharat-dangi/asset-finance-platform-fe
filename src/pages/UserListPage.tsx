import React, { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import { User } from "../types/User";
import UserList from "../components/UserList";

/**
 * @page UserListPage
 * @description Page component to list all users.
 */
const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

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

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center">User List</h2>
      <UserList users={users} />
    </div>
  );
};

export default UserListPage;
