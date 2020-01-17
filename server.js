// I imported all the dependencies to the server file
const express = require(`express`);
const helmet = require(`helmet`);
const actionRouter = require(`./data/helpers/action-Router`);
const projectRouter = require(`./data/helpers/project-Router`);
const server = express();

server.use(express.json());
server.use(helmet(/*The configuration of helmet will be done here*/));
server.use(`/api/action`, actionRouter);
server.use(`/api/project`, projectRouter);
server.get(`/`, logger, (req, res) => {
  res.send(`<h2>Lambda Projects!</h2>`);
});

// I created a logger middleware
function logger(req, res, next) {
  const timeStamp = Date.now();
  console.log(req.method, timeStamp, req.url);
}
// I exported the server
module.exports = server;
