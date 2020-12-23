const express = require('express');
const feedController= require('../controllers/feedController');

const router = express.Router();

//All routes for both user and task

router.get('/',feedController.fetchAll);

router.post('/user', feedController.postUser);

router.post('/task/:userId', feedController.postTask);

router.put('/user/:userId',feedController.UpdateUser);

router.delete('/user/:userId',feedController.deleteUser);

router.put('/task/:taskId',feedController.UpdateTask);

router.delete('/task/:taskId',feedController.deleteTask);

module.exports = router;