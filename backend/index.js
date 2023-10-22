const app_express = require('./app');
require('dotenv').config();

const PORT = process.env.PORT;

app_express.listen(PORT, error => {
	error ? console.log(error) : console.log(`Server has been started ${PORT}`);
});
