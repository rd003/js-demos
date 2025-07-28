const BASE_URL = import.meta.env.VITE_API_BASE_URL + '/people';

export const addPerson = async (person) => {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(person)
    });
    if (!res.ok) {
        throw new Error(`Http error! status: ${res.status}, message: ${res.statusText}`);
    }

    const createdPerson = await res.json();
    return createdPerson;
}

export const updatePerson = async (person) => {
    const res = await fetch(`${BASE_URL}/${person.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(person)
    });
    if (!res.ok) {
        throw new Error(`Http error! status: ${res.status}, message: ${res.statusText}`);
    }
}

export const deletePerson = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!res.ok) {
        throw new Error(`Http error! status: ${res.status}, message: ${res.statusText}`);
    }
}

export const getPeople = async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
        throw new Error(`Http error! status: ${res.status}, message: ${res.statusText}`);
    }
    return await res.json();
}
