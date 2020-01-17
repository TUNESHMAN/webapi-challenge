const express = require(`express`);
const Projects = require(`./projectModel`);
const router = express.Router();

// ENDPOINT TO ADD A PROJECT
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

// ENDPOINT TO ADD A PROJECT BY ID
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
// ENDPOINT TO GET A PROJECT
router.get(`/`, (req, res) => {
  Projects.get()
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      // Error is logged to the server
      console.log(error);
      error.status(500).json({
        message: `Error retrieving the project`
      });
    });
});

// DELETE A PROJECT BY ID
router.delete(`/:id`, (req, res) => {
  Projects.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `Project deleted from database`
        });
      } else {
        message: `Error finding the project`;
      }
    })
    .catch(error => {
      // Log error on server
      console.log(error);
      res.status(500).json({
        message: `Project cannot be found`
      });
    });
});

module.exports = router;
