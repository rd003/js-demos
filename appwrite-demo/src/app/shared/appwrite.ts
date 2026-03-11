import { Client, TablesDB } from 'appwrite';
import { environment } from '../../environments/environment.development';
const client: Client = new Client()
    .setEndpoint(environment.appwriteEndpoint)
    .setProject(environment.appwriteProjectId);

const db = new TablesDB(client);

export { db };

