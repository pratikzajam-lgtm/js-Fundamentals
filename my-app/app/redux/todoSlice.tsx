import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


type todo = {
    id: number,
    task: string,
    isCompleted: boolean
}

type TodoState = {
    todos: todo[]
}


const initialState: TodoState = {
    todos: []
}


type updateObject = {
    id: number,
    task: string,
    isCompleted: boolean

}


export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addToDo: (state, action: PayloadAction<string>) => {

            const task = action.payload;

            const todo = { id: Date.now(), task: task, isCompleted: false }

            state.todos.push(todo)

        },

        deleteTodo: (state, action: PayloadAction<number>) => {

            const id = action.payload
            const filteredtoDo = state.todos.filter((todo) => (todo.id != id))
            state.todos = filteredtoDo
        },


        updateTodo: (state, action: PayloadAction<updateObject>) => {

            const { id, task, isCompleted } = action.payload

            state.todos = state.todos.map((todo) => {
                return (todo.id == id) ? { id: id, task: task, isCompleted: isCompleted } : todo
            })
        }

    }
})


export const { addToDo, deleteTodo, updateTodo } = todoSlice.actions
export default todoSlice.reducer