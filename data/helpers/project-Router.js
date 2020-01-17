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

router.post(`/:id/project`, (req, res) => {
  projectInfo = { ...req.body, project_id: req.params.id };
  Projects.insert(projectInfo)
    .then(project => {
      res.status(210).json(project);
    })
    .catch(error => {
      // Log error to the server
      console.log(error);
      res.status(500).json({
        message: `There was an error handling this project`
      });
    });
});

module.exports = router;
