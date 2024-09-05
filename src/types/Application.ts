import { User } from "./User";

/**
 * @interface Application
 * @description Type definition for Application object.
 */
export interface Application {
  _id: string;
  userId: string | User;
  income: number;
  expenses: number;
  assets: number;
  liabilities: number;
}

export interface PopulatedApplication {
  _id: string;
  userId: User;
  income: number;
  expenses: number;
  assets: number;
  liabilities: number;
}
