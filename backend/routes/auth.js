const express = require('express');
const authControllers = require('../controller/authControllers');
const authRouter = express.Router();

//localhost:3000/auth/login
authRouter.post('/login', authControllers.login);

//localhost:3000/auth/register
authRouter.post('/register', authControllers.register);

module.exports = authRouter;
