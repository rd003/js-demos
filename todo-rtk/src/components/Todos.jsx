import { useDispatch, useSelector } from "react-redux"
import { removeTodo } from '../features/todo/todoSlice'

function Todos() {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className="text-3xl font-bold my-2">Todos</h1>

      <table className="table-auto min-w-full bg-white overflow-hidden">
        <thead className="bg-pink-400">
          <tr className="border-2 border-pink-300">
            <th className="text-xl py-2 px-3 text-md text-center border-2 border-pink-300">Item</th>
            <th className="text-xl py-2 px-3 text-md text-center border-2 border-pink-300">Action</th>
          </tr>
        </thead>

        <tbody className="bg-pink-200">
          {todos.map(todo => (
            <tr className="border-2 border-pink-300" key={todo.id}>
              <td className="py-2 px-3 text-lg text-center border-2 border-pink-300">{todo.text}</td>
              <td className="py-2 px-3 text-md text-center border-2 border-pink-300">
                <button className="bg-red-600 text-xl py-3 px-4 cursor-pointer text-white hover:bg-red-500" type="button" onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Todos