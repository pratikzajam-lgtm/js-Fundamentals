import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setId] = useState("");
  const [edit, setEdit] = useState(false)


  let handleSubmit = (e) => {
    e.preventDefault();
    if (!edit) {


      const id = Date.now();

      setTodo((prev) => [...prev, { id: id, task: input }])

      console.log(todo)

      setInput("")

    } else {
      let updatedTodo = todo.map((ele, index) => {
        return (ele.id == editId) ? { ...ele, task: input } : ele
      })

      setTodo(updatedTodo)

    }

  }


  let handleEdit = (id) => {
    setEdit(true);

    setId(id)

    let selectedTodo = todo.find((ele) => ele.id == id)

    console.log(selectedTodo)

    setInput(selectedTodo.task)
  }


  let handleDelete = (id) => {

    let newTodoList = todo.filter((todo) => todo.id != id)
    setTodo(newTodoList)
  }

  return (
    <>
      <div className="main">

        <form onSubmit={handleSubmit} action="">
          <label htmlFor="">Task</label>
          <input value={input} onChange={(e) => setInput(e.target.value)} name="task" className='border' type="text" />
          <button className='bg-indigo-500 border'>{(edit) ? "Update" : "Submit"}</button>
        </form>


        <div>
          {todo.map((ele, index) => (
            <div className='flex justify-center align-center'>
              <h3 className='px-5 py-1'>{ele.task}</h3>
              <button onClick={() => handleDelete(ele.id)} className='bg-red-500'>Delete</button>
              <button onClick={() => handleEdit(ele.id)} className='bg-yellow-500'>Edit</button>
            </div>
          ))}
        </div>


      </div>
    </>
  )
}

export default App
