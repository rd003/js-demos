'use client';

import { useEffect, useState } from "react";
import { Person } from "../lib/types";
import { createPerson, deletePerson, getPersons, updatePerson } from "./actions";

export default function Home() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchPersons = async () => {
    const data = await getPersons();
    setPersons(data);
  }

  useEffect(() => { fetchPersons() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updatePerson(editingId, firstName, lastName);
      setEditingId(null);
    } else {
      await createPerson(firstName, lastName);
    }

    setFirstName('');
    setLastName('');
    fetchPersons();
  }

  const handleDelete = async (id: number) => {
    await deletePerson(id);
    fetchPersons();
  }

  const handleEdit = (person: Person) => {
    setFirstName(person.FirstName);
    setLastName(person.LastName);
    setEditingId(person.Id);
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Person CRUD App</h1>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingId ? 'Update' : 'Add'} Person
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => { setEditingId(null); setFirstName(''); setLastName(''); }}
            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
          >
            Cancel
          </button>
        )}
      </form>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">First Name</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <tr key={person.Id}>
              <td className="border p-2">{person.Id}</td>
              <td className="border p-2">{person.FirstName}</td>
              <td className="border p-2">{person.LastName}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(person)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(person.Id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
