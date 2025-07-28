function PostList({ posts, onDelete, onEdit }) {
    return (
        <div>
            <h3>Posts</h3>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        posts.map(post =>
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>
                                    <button onClick={() => onEdit(post)}>Edit</button>
                                    <button onClick={() => onDelete(post)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>);
}

export default PostList