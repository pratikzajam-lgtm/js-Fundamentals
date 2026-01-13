"use client"
import React from "react";
import { ToastContainer, toast } from 'react-toastify';

interface Todo {
    id: number;
    task: string;
    priority: string;
}

interface DisplayProps {
    todos: Todo[];
    setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
    setId: React.Dispatch<React.SetStateAction<number>>;
    isEdit: React.Dispatch<React.SetStateAction<boolean>>;
    task: string,
    priority: string,
    setTask: React.Dispatch<React.SetStateAction<string>>;
    setPriority: React.Dispatch<React.SetStateAction<string>>;
}

const Display = ({ todos, setTodo, setId, isEdit, task, priority, setTask, setPriority }: DisplayProps) => {



    console.log(todos)

    if (todos.length < 1) {
        return (
            <h4 className="text-center mt-6 text-gray-500">
                No Data Found
            </h4>
        );
    }

    const handleDelete = (
        id: number
    ) => {


        if (confirm("Do You Want To Delete This Record?")) {
            const filteredList = todos.filter((todo) => (todo.id != id));
            setTodo(filteredList)

            toast("Task Deleted Sucessfully")
        }





    };


    const handleEdit = (id: number) => {
        setId(id)
        isEdit(true)

        const todo = todos.find((todo) => todo.id == id)

        if (!todo) {
            return
        }

        setTask(todo.task)
        setPriority(todo.priority)
    }

    return (
        <>
            <div className="overflow-x-auto mt-6">
                <table className="min-w-[600px] mx-auto border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                ID
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                Task
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                Priority
                            </th>

                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                Delete
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                Edit
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {todos.map((todo) => (
                            <tr
                                key={todo.id}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                <td className="px-4 py-2 text-sm text-gray-600">
                                    {todo.id}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-800">
                                    {todo.task}
                                </td>
                                <td className="px-4 py-2 text-sm">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium
                    ${todo.priority === "high"
                                                ? "bg-red-100 text-red-600"
                                                : todo.priority === "medium"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-green-100 text-green-600"
                                            }
                  `}
                                    >
                                        {todo.priority}
                                    </span>
                                </td>

                                <td>
                                    <button
                                        onClick={() => handleDelete(todo.id)}
                                        className="
    inline-flex items-center gap-2
    bg-red-600 text-white
    px-3 py-1.5 rounded-md
    text-sm font-medium
    hover:bg-red-700
    focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
    transition
  "
                                    >
                                        Delete
                                    </button>

                                </td>

                                <td>
                                    <button
                                        onClick={() => handleEdit(todo.id)}
                                        className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-3 py-1.5 rounded-md hover:bg-yellow-500 transition"
                                    >
                                        Edit
                                    </button>


                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Display;
