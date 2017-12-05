'use strict';

module.exports = function(app) {
  var User = require('../models/User');
  var todoList = require('../controllers/todoListController');
  var authenController = require('../controllers/AuthController');

  // setup
  app.route('/setup')
    .get(authenController.setup);
  // authen
  app.route('/authenticate')
    .post(authenController.authenticate);

  // todoList Routes
  app.route('/api/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);
  // test refix /api/...
  app.route('/api/test').get(todoList.testapi);


  app.route('/api/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
    
};