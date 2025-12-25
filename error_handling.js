//error handling using async await 

async function getData() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log( err.message);
  }
}

getData()


//error handling using .then and catch

fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err.message));

