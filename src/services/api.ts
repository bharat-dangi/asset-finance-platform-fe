import axios from "axios";
import { User } from "../types/User";
import { Application, PopulatedApplication } from "../types/Application";

const API_URL = process.env.REACT_APP_BE_URL; // Backend URL

/**
 * @function getUsers
 * @description Fetches all users.
 * @returns {Promise<User[]>} List of users.
 */
export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/v1/user`);
  return response?.data?.data;
};

/**
 * @function createUser
 * @description Creates a new user.
 * @param {User} user - User data.
 * @returns {Promise<User>} The created user.
 */
export const createUser = async (user: Partial<User>): Promise<User> => {
  const response = await axios.post(`${API_URL}/v1/user`, user);
  return response?.data?.data;
};

/**
 * @function getApplications
 * @description Fetches all applications.
 * @returns {Promise<PopulatedApplication[]>} List of applications.
 */
export const getApplications = async (): Promise<PopulatedApplication[]> => {
  const response = await axios.get(`${API_URL}/v1/application`);
  return response?.data?.data;
};

/**
 * @function createApplication
 * @description Creates a new application.
 * @param {Application} application - Application data.
 * @returns {Promise<Application>} The created application.
 */
export const createApplication = async (application: Omit<Application, "_id">): Promise<Application> => {
  const response = await axios.post(`${API_URL}/v1/application`, application);
  return response?.data?.data;
};

/**
 * @function deleteApplication
 * @description Deletes an application by ID.
 * @param {string} applicationId - Application ID.
 * @returns {Promise<void>} Confirmation of deletion.
 */
export const deleteApplication = async (applicationId: string): Promise<void> => {
  await axios.delete(`${API_URL}/v1/application/delete-one-application`, { params: { _id: applicationId } });
};

/**
 * @function updateApplication
 * @description Updates an application by ID.
 * @param {string} applicationId - Application ID.
 * @param {Partial<Application>} applicationData - Application data to update.
 * @returns {Promise<Application>} The updated application.
 */
export const updateApplication = async (
  applicationId: string,
  applicationData: Partial<Application>,
): Promise<Application> => {
  const response = await axios.patch(`${API_URL}/v1/application/update-one-application`, {
    _id: applicationId,
    ...applicationData,
  });
  return response?.data?.data;
};
