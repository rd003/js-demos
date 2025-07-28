const BASE_URL = 'https://my-json-server.typicode.com/typicode/demo/posts';

export async function getPosts() {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return await res.json();
}

export async function addPost(post) {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post)
    });
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return await res.json();
}

export async function updatePost(post) {
    const res = await fetch(`${BASE_URL}/${post.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post)
    });
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
}

export async function deletePost(id) {
    const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
}
