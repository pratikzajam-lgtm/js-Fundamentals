"use client"
import type { UseDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from './redux/store';
import { useAppSelector, useAppDispatch } from './redux/hooks/index';
import { addToDo, deleteTodo, updateTodo } from './redux/todoSlice';
import { useState } from "react";

interface todo {
  id: number,
  task: string,
  isCompleted: boolean
}




export default function Home() {

  const [todo, setTodo] = useState("")
  const [edit, setEdit] = useState(false);
  const [editId, setID] = useState(0)


  const ToDos = useAppSelector((state) => state.todo.todos)
  const dispatch = useAppDispatch();


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();



    if (!edit) {

      if (todo == "" || addToDo == null) {
        alert("Please Enter Task");
        return
      }
      dispatch(addToDo(todo))
      setTodo("")
    } else {


      const EditTask = ToDos.find((todo) => (
        todo.id == editId
      ))

      const updatedTodo = { ...EditTask!, task: todo }

      console.log(updatedTodo)
      dispatch(updateTodo(updatedTodo))

      setEdit(false)

      setTodo("")

    }



  }

  const handleDelete = (id: number): void => {

    if (confirm("Are You Really Want To Delete This Todo?")) {
      dispatch(deleteTodo(id))
    }

  }


  const handleEdit = (id: number): void => {
    setEdit(true)
    setID(id)


    const EditTask = ToDos.find((todo) => (
      todo.id == id
    ))

    console.log(EditTask)

    if (!EditTask) {
      alert("SOmething went wrong");
      return
    }

    setTodo(EditTask.task)



  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Tasks</h1>
          <p className="text-gray-600">Stay organized and productive</p>
        </div>


        <form onSubmit={handleSubmit} className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <label
              htmlFor="todo"
              className="block text-sm font-medium text-gray-700 mb-3"
            >
              Todo
            </label>
            <div className="flex gap-3">
              <input
                value={todo}
                onChange={(e) => { setTodo(e.target.value) }}
                name="todo"
                type="text"
                id="todo"
                placeholder="Enter your task..."
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className={`px-6 py-3 rounded-xl font-medium text-white transition-all shadow-md hover:shadow-lg ${edit
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-purple-500 hover:bg-purple-600"
                  }`}
              >
                {(edit) ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </form>


        <div className="todos space-y-3">
          {ToDos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-5 border border-gray-100"
            >
              <div className="flex items-center justify-between gap-4">
                <h5 className="text-lg text-gray-700 font-medium flex-1">
                  {todo.task}
                </h5>
                <div className="flex gap-2">
                  <button
                    onClick={() => { handleEdit(todo.id) }}
                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium border border-blue-200 hover:border-blue-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => { handleDelete(todo.id) }}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium border border-red-200 hover:border-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>


        {ToDos.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <p className="text-gray-400 text-lg">
              No tasks yet. Add one to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
