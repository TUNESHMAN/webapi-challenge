// Here, i imported the server and listened to it.
const server = require("./server");

server.listen(4000, () => {
  // Log a message on the server
  console.log(`Running on port 4000`);
});
