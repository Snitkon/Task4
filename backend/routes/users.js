const express = require('express');
const usersRouter = express.Router();
const usersControllers = require('../controller/usersControllers');
const passport = require('passport');

// localhost:3000/api/users
usersRouter.get('/', passport.authenticate('jwt', { session: false }), usersControllers.getUsers);
usersRouter.get('/:id', passport.authenticate('jwt', { session: false }), usersControllers.getUserById);
usersRouter.delete('/:id', passport.authenticate('jwt', { session: false }), usersControllers.deleteUserById);
usersRouter.patch('/:id', passport.authenticate('jwt', { session: false }), usersControllers.activeBlockUser);

module.exports = usersRouter;
