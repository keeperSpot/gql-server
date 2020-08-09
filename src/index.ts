import { Server } from "./server";

const server = new Server();
server
  .start()
  .then(() => console.log("Started server..."))
  .catch((error) => console.log("Problem in starting server...", error));
