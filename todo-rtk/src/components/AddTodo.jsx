import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from '../features/todo/todoSlice'

function AddTodo() {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addTodo(input));
        setInput('');
    }

    return (
        <div className="mb-4">
            <h1 className="text-3xl font-bold my-2">Add todo</h1>

            <form className="inline-flex gap-2" onSubmit={handleSubmit}>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter todo" className="border-2 py-2.5 px-3 text-2xl" />

                <button type="submit" className="border-none py-2.5 px-4 text-2xl bg-pink-600 hover:bg-pink-500 text-white cursor-pointer"> Add </button>
            </form>
        </div>
    )
}

export default AddTodo