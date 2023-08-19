const express = require('express');
const router = express.Router();
const {
  login_client,
  auth_client
  } = require('../controllers/clients_controller.js');

/* GET users listing. */

router.get('/auth',auth_client); // auth
router.post('/login', login_client);

module.exports = router;
