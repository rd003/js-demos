'use server';

import db from '@/lib/db'
import { revalidatePath } from 'next/cache';
import { Person } from '@/lib/types';

export async function getPersons(): Promise<Person[]> {
    const persons = db.prepare('SELECT * FROM Person').all() as Person[];
    return persons;
}

export async function createPerson(firstName: string, lastName: string): Promise<Person> {
    const result = db.prepare('INSERT INTO Person (FirstName, LastName) VALUES (?, ?)').run(firstName, lastName);
    revalidatePath('/');
    return { Id: Number(result.lastInsertRowid), FirstName: firstName, LastName: lastName };
}

export async function updatePerson(id: number, firstName: string, lastName: string): Promise<void> {
    db.prepare('UPDATE Person SET FirstName = ?, LastName = ? WHERE Id = ?').run(firstName, lastName, id);
    revalidatePath('/');
}

export async function deletePerson(id: number): Promise<void> {
    db.prepare('DELETE FROM Person WHERE Id = ?').run(id);
    revalidatePath('/');
}