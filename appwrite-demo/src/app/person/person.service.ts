import { Injectable } from "@angular/core";
import { db } from "../shared/appwrite";
import { environment } from "../../environments/environment.development";
import { Person } from "./person.model";
import { ID } from "appwrite";

@Injectable({ providedIn: 'root' })
export class PersonService {
    async getPeople(): Promise<Person[]> {
        const response = db.listRows({
            databaseId: environment.appwriteDatabaseId,
            tableId: environment.appwritePeopleCollectionId
        });
        return (await response).rows as unknown as Person[];
    }

    async addPerson(person: Person): Promise<Person> {
        const response = db.createRow({
            databaseId: environment.appwriteDatabaseId,
            tableId: environment.appwritePeopleCollectionId,
            rowId: ID.unique(),
            data: person
        });
        return (await response) as unknown as Person;
    }

    async updatePerson(person: Person): Promise<Person> {
        const response = db.updateRow({
            databaseId: environment.appwriteDatabaseId,
            tableId: environment.appwritePeopleCollectionId,
            rowId: person.$id,
            data: person
        });
        return (await response) as unknown as Person;
    }

    async deletePerson(id: string): Promise<void> {
        await db.deleteRow({
            databaseId: environment.appwriteDatabaseId,
            tableId: environment.appwritePeopleCollectionId,
            rowId: id
        });
    }
}