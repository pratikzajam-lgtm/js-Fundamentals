"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, addTodo } from "./api";


interface Post {
  userId: number,
  "id": number,
  "title": string,
  "body": string
}


export default function Home() {
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: fetchUsers,
  // });

  const queryclient = useQueryClient()


  const { mutate, data, isLoading, isSuccess } = useMutation({
    mutationFn: addTodo,

    onSuccess: () => {
      queryclient.invalidateQueries({
        queryKey: ["todos"],
      })
    },

  })

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // console.log(data)

  // if (data.length < 1) {
  //   return <h1>Something went wrong</h1>;
  // }

  // if (error) {
  //   return <h1>Error Fetching Users Data</h1>;
  // }

  console.log(data)

  return (
    <div>
      {/* {data.map((post: Post) => (
        <h5 key={post.id}>{post.title}</h5>
      ))} */}

      <button onClick={() => { mutate({ id: 1, task: "new Task", isCompleted: false }) }}>submit</button>

      {isSuccess && <p>Todo added sucesfully</p>}

      <div>Task:{data?.task}</div>

    </div>


  );
}
