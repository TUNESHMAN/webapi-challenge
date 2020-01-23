const express = require(`express`);
const Actions = require(`./actionModel`);
const router = express.Router();


// ENDPOINT TO ADD AN ACTION
router.post(`/`, validateAction, () => {
    Actions.insert(req.body)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(error => {
        // I logged error to the server
        console.log(error);
        res.status(500).json({
          message: `Error adding the action`
        });
      });
  });
  
  // ENDPOINT TO ADD AN ACTION BY ID
  router.post(`/:id/action`,  (req, res) => {
    actionInfo = { ...req.body, project_id: req.params.id };
    Actions.insert(actionInfo)
      .then(action => {
        res.status(210).json(action);
      })
      .catch(error => {
        // Log error to the server
        console.log(error);
        res.status(500).json({
          message: `There was an error handling this action`
        });
      });
  });
  // ENDPOINT TO GET AN ACTION
  router.get(`/`, (req, res) => {
    Actions.get()
      .then(action => {
        res.status(200).json(action);
      })
      .catch(error => {
        // Error is logged to the server
        console.log(error);
        error.status(500).json({
          message: `Error retrieving the action`
        });
      });
  });
  
  // ENDPOINT TO DELETE AN ACTION 
  router.delete(`/:id`, (req, res) => {
    Actions.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({
            message: `Action deleted from database`
          });
        } else {
          message: `Error finding the action`;
        }
      })
      .catch(error => {
        // Log error on server
        console.log(error);
        res.status(500).json({
          message: `Action cannot be found`
        });
      });
  });
  
  // ENDPOINT TO UPDATE AN ACTION
  router.put(`/:id`, (req, res) => {
    Actions.update(req.params.id, req.body)
      .then(action => {
        if (action) {
          res.status(200).json(action);
        } else {
          res.status(404).json({
            message: `Action could not be found`
          });
        }
      })
      .catch(error => {
        //   Error logged to database
        console.log(error);
        res.status(404).json({
          message: `Action could not be updated`
        });
      });
  });
  
  // MY CUSTOM MIDDLEWARE LIVES HERE
  function validateAction(req, res, next) {
    // I pulled the action from req.body
    const action = req.body;
    if (Object.keys(action).length <= 1) {
      res.status(404).json({
        message: `missing action information`
      });
    } else if (!action.desciption) {
      res.status(400).json({
        message: `missing action description field`
      });
    } else {
      next();
    }
  }
  
  module.exports = router;
  