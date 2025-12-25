// Import the events module
import EventEmitter from "events";


const emitter = new EventEmitter();

emitter.on("login", (username) => {
  console.log(`User logged in: ${username}`);
});

emitter.emit("login", "Pratik");


