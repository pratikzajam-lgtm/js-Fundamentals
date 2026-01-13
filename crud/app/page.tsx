"use client"
import TaskForm from './components/Form';
import Display from './components/Display';
import { useState } from 'react';

export default function Home() {


  interface Todo {
    id: number,
    task: string,
    priority: string
  }

  const [toDos, setTodo] = useState<Todo[]>([])
  const [id, setId] = useState(0)
  const [edit, isEdit] = useState(false)
  const [task, setTask] = useState("")
  const [priority, setPriority] = useState("low")


  return (
    <>
      <TaskForm setTodo={setTodo} task={task} priority={priority} setTask={setTask} setPriority={setPriority} id={id} edit={edit} toDos={toDos} isEdit={isEdit} />
      <Display todos={toDos} setTodo={setTodo} setId={setId} isEdit={isEdit} task={task} priority={priority} setTask={setTask} setPriority={setPriority} />
    </>
  );
}
