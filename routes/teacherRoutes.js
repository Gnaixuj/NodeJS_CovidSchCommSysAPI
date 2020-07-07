const express = require('express');
const router = express.Router();
const morgan = require('morgan');
// const bodyParser = require('body-parser');
const teacherController = require('../controllers/teacherController');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(morgan('dev'));

router.post('/register', teacherController.register);

router.get('/commonstudents', teacherController.commonstudents);

router.post('/suspend', teacherController.suspend);

router.post('/retrievefornotifications', teacherController.retrievefornotifications);

module.exports = router;


