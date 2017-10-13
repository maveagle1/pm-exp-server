var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');

// GET all the data from the list
router.get('/', function(req, res, next) {
  knex.raw(`SELECT * FROM projects`)
  .then(data => {
    res.json(data.rows)
  })
});

// Get individual row
router.get('/:id', function(req, res, next) {
  knex.raw(`SELECT  * FROM projects WHERE id = ${req.params.id}`)
  .then(function(data){
    res.json('project', {project: data.rows[0]});
  })
});

 // Add a new program to the list
router.post('/add', function(req, res, next){
  knex.raw(`INSERT INTO projects(program_name, number_of_projects, program_manager, priority, status, complete) VALUES ('${req.body.program_name}','${req.body.number_of_projects}','${req.body.program_manager}','${req.body.priority}','${req.body.status}','${req.body.complete}')`)
  .then(function(data){
    knex('projects').select().then(data => res.json(data))
  })
});

//GET EDIT FROM FOR UPDATING PROGRAM
 
router.get('/:id/edit', function(req, res, next){
  knex.raw(`SELECT  * FROM projects WHERE id = ${req.params.id}`)
  .then( () => {
    knex('projects').select().then(data => res.json(data))
  })
});
 
//POST UPDATING PLAYER
 
router.post('/:id', function(req, res, next){
  knex.raw(`UPDATE project set  program_name = '${req.body.program_name}', number_of_projects = '${req.body.number_of_projects}', program_name = '${req.body.program_name}', priority = '${req.body.priority}', status = '${req.body.status}', complete = '${req.body.complete}' WHERE id = ${req.params.id}`)
  .then( () => {
    knex('projects').select().then(data => res.json(data))
  })
});

// DELETE PLAYER
router.post('/:id/delete', function(req, res, next){
        knex.raw(`DELETE FROM projects WHERE id = ${req.params.id}`)
  .then( () => {
  knex('projects').select().then(data => res.json(data))
  })
      });

module.exports = router;
