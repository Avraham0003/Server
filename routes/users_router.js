const express = require('express');
const router = express.Router();
const {
  get_all_users,
  create_user,
  get_user_by_id,
  delete_user,
  login_user,
  auth,
  client_login,
  client_auth
  } = require('../controllers/users_controller.js');

/* GET users listing. */

router.get('/auth',auth ); // auth
router.post('/login', login_user);
router.post('/create', create_user); // create new user
router.get('/all', get_all_users); // get all users
router.delete('/delete/:user_id', delete_user); // delete use by id
router.get('get_by_id/:user_id', get_user_by_id); // get user by id
router.post('/clientlogin', client_login);
router.get('/clientauth', client_auth)

module.exports = router;
