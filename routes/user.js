const {
  register,
  login,
  updateProfile,
  getUserProfile,
} = require('../controllers/users');
const authorization = require('../middlewares/authorization');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/update-profile', authorization, updateProfile);
router.get('/get-user', authorization, getUserProfile);

module.exports = router;
