const express = require('express');
const router = express.Router();

const { register, login, delter } = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);
router.delete('/dele', delter);

module.exports = router;
