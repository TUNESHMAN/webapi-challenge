const express = require(`express`);
const Projects = require(`./projectModel`);
const router = express.Router();

router.post(`/`, () => {
  Projects.insert(req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      // I logged error to the server
      console.log(error);
      res.status(500).json({
        message: `Error adding the project`
      });
    });
});

module.exports = router;
