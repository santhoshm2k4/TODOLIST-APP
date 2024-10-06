import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true);
  const [showFinished, setshowFinished] = useState(true)

  // Load todos from localStorage when the component mounts
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
    setLoading(false);  // Set loading to false after todos are loaded
  }, []);

  // Save todos to localStorage whenever the todos state changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, loading]);
  
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id == id;
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
  }


  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-indigo-100 min-h-[80vh] md:w-1/3">
        <h1 className='font-bold text-center text-3xl'>PrimeFocus – Prioritize your Daily Karmas</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a ToDo</h2>
          <div className='flex gap-2'>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full py-1 px-2' />
          <button disabled={todo.length<=3} onClick={handleAdd} className='bg-indigo-800 hover:bg-indigo-950 p-4 py-2 text-sm font-bold text-white rounded-xl  disabled:bg-indigo-700 mx-2'>Save</button>
          </div>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} name="" id="show" />
        <label htmlFor="show">Show Finished</label>
        <div className='h-[2px] bg-indigo-950 opacity-25 w-[90%] my-2 mx-auto'></div>
        <h2 className='text-2xl font-bold'>Your ToDos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5 '>No ToDos to Display</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-full my-3 justify-between">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}
                </div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e,item.id)} className='bg-indigo-800 hover:bg-indigo-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-indigo-800 hover:bg-indigo-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>

      </div>
    </>
  )
}

export default App
