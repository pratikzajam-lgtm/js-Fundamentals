"use client"
import React from "react";
import { useState } from "react";
import { toast } from 'react-toastify';

interface Todo {
    id: number;
    task: string;
    priority: string;
}


interface TaskFormProps {
    setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
    task: string;
    priority: string;
    setTask: React.Dispatch<React.SetStateAction<string>>;
    setPriority: React.Dispatch<React.SetStateAction<string>>;
    id: number;
    edit: boolean;
    toDos: Todo[];
    isEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskForm = ({ setTodo, task, priority, setTask, setPriority, id, edit, toDos, isEdit }: TaskFormProps) => {

    const HandleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!edit) {
            if (!task) {
                toast("Please Enter The Task");
                return
            }

            if (!priority) {
                toast("Please Select The Priority");
                return
            }

            const newTask = { id: Date.now(), task: task, priority: priority }

            setTodo((prev) => ([...prev, newTask]))

            setTask("")
            setPriority("")
            toast("Task Added Sucesfully");
        } else {

            const updatedTodo = toDos.map((todo) =>
                (todo.id == id) ? { ...todo, task: task, priority: priority } : todo
            )

            setTodo(updatedTodo)
            isEdit(false)
            toast("Task Updated Sucessfully");

        }

    }




    return (
        <form onSubmit={HandleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-center mb-6">
                Add Task
            </h2>

            <div className="mb-4">
                <label
                    htmlFor="taskName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Task Name
                </label>
                <input value={task}
                    onChange={(e) => { setTask(e.target.value) }}
                    id="taskName"
                    type="text"
                    placeholder="Enter task name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>


            <div className="mb-6">
                <label
                    htmlFor="priority"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Priority
                </label>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    id="priority"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm 
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="" disabled>
                        Please Select Priority
                    </option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

            </div>


            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md 
                   hover:bg-blue-700 transition-colors"
            >
                {(edit) ? "Edit Task" : "Add Task"}
            </button>
        </form>
    );
};

export default TaskForm;
