const express = require('express');
const usersRouter = express.Router();
const usersControllers = require('../controller/usersControllers');
const passport = require('passport');

// localhost:3000/users/
usersRouter.get('/', passport.authenticate('jwt', { session: false }), usersControllers.getUsers);
// localhost:3000/users/:id
usersRouter.get('/:id', passport.authenticate('jwt', { session: false }), usersControllers.getUserById);
// localhost:3000/users/:id
usersRouter.delete('/:id', passport.authenticate('jwt', { session: false }), usersControllers.deleteUserById);
// localhost:3000/users/:id
usersRouter.patch('/:id', passport.authenticate('jwt', { session: false }), usersControllers.activeBlockUser);

module.exports = usersRouter;
