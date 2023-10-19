const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport')
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users')
const app_express = express();
require('dotenv').config();

const URI = process.env.MONGO_URI;

mongoose
	.connect(URI)
	.then(() => {
		console.log('DB connected');
	})
	.catch(err => console.log(err));

app_express.use(passport.initialize())
require('./middleware/passport')(passport)

app_express.use(morgan('dev'));
app_express.use(cors());
app_express.use(bodyParser.urlencoded({ extended: true }));
app_express.use(bodyParser.json());

app_express.use('/auth', authRouter);
app_express.use('/users', usersRouter)

module.exports = app_express;
