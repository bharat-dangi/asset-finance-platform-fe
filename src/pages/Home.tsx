import React, { useState } from "react";
import ApplicationFormModal from "../components/ApplicationFormModal";
import ApplicationList from "../components/ApplicationList";

/**
 * @component Home
 * @description Home component to display application list and add new applications.
 */
const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(true); // State to trigger refresh

  const handleFormSubmit = () => {
    setShouldRefresh(true); // Set to true to indicate a refresh is needed
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-blue-600">Applications</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Add New Application
        </button>
      </div>
      <ApplicationList shouldRefresh={shouldRefresh} setShouldRefresh={setShouldRefresh} />

      {isModalOpen && <ApplicationFormModal onClose={() => setIsModalOpen(false)} onFormSubmit={handleFormSubmit} />}
    </div>
  );
};

export default Home;
