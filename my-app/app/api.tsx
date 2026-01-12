async function fetchUsers() {

    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!response.ok) {
        throw new Error("Failed To Fetch Users")
    }

    return response.json()
}


interface todo {
    id: number,
    task: string,
    isCompleted: false
}


async function addTodo(todo: todo) {

    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo)
    });

    return response.json()

}


export { fetchUsers, addTodo } 