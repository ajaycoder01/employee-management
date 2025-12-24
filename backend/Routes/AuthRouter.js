

const router = require('express').Router();
const { Signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

router.post('/signup', signupValidation, Signup);
router.post('/login', loginValidation, login);

module.exports = router;
