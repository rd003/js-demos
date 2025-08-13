import AddTodo from "./components/AddTodo"
import Todos from "./components/Todos"

function App() {
  return (
    <div className="bg-pink-100 w-screen h-screen p-4">
      <AddTodo />
      <Todos />
    </div>
  )
}

export default App