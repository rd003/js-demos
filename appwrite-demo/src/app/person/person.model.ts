import { Models } from "appwrite";

export interface Person extends Models.Document {
    FirstName: string;
    LastName: string;
}