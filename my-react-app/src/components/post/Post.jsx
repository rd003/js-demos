import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PostList from "./PostList";
import PostForm from "./PostForm";
import { addPost, updatePost, getPosts, deletePost } from '../../services/post.service'
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

export default function Post() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false);
    const defaultFormValues = { id: '', title: '' };
    const [editData, setEditData] = useState(null);
    const methods = useForm({ defaultValues: defaultFormValues });

    useEffect(() => {
        if (editData) {
            methods.reset(editData);
        }
    }, [editData]);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const posts = await getPosts();
                setPosts(posts);
            }
            catch (error) {
                toast('Error has occured!', { className: 'text-error' });
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    function onEdit(post) {
        setEditData(post);
    }

    function onFormReset() {
        methods.reset(defaultFormValues);
    }

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            if (data.id) {
                await updatePost(data);
                setEditData(null);
                setPosts((prevPosts) => prevPosts.map(p => p.id === data.id ? data : p));
            }
            else {
                const createdPost = await addPost({ title: data.title });
                setPosts((prevPosts) => ([...prevPosts, createdPost]));
            }
            toast('Saved successfully!');
            methods.reset(defaultFormValues);
        }
        catch (error) {
            toast('Error has occured!', { className: 'text-error' });
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    async function handleOnDelete(obj) {
        if (!window.confirm(`Are you sure to delete post with id:${obj.id}`))
            return;
        setLoading(true);
        try {
            await deletePost(obj.id);
            // remove element from the state
            setPosts((prevState) => prevState.filter(p => p.id !== obj.id));
        } catch (error) {
            console.log(error)
            toast('Error has occured!', { className: 'text-error' });
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            {loading && <ClipLoader size={50} area-label="loading spinner" data-testid='loader' />}

            <PostForm onFormSubmit={onSubmit} methods={methods} onFormReset={onFormReset} />

            {posts.length > 0 && <PostList posts={posts} onDelete={handleOnDelete} onEdit={onEdit} />}

        </>
    );
}