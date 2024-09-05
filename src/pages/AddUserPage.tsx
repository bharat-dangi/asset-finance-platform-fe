import React from "react";
import UserForm from "../components/UserForm";

/**
 * @page AddUserPage
 * @description Page component for adding a new user.
 */
const AddUserPage: React.FC = () => {
  return (
    <div className="mt-8">
      <UserForm onFormSubmit={() => {}} />
    </div>
  );
};

export default AddUserPage;
