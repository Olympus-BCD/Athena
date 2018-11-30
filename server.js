const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;
const env = require('dotenv').load();
const cors = require('cors');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


/*
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}
*/

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/athena_testDB', { useNewUrlParser: true }).then(() => console.log('Mongoose connected...'));

app.listen(PORT, function() {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});