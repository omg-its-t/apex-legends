const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

//load env
dotenv.config({path: './config.env' });

const app = express();

//dev logging - check if dev more and log if true
//this will log the request type - endpoint - response code - time took in the console
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'));
}

//profile routes
app.use('/api/v1/profile', require('./routes/profile'));

//handle production
if(process.env.NODE_ENV === 'production'){
    //set public static folder
    app.use(esxpress.static(__dirname + '/public/'));
}

//handle SPA
//if any route get hits of the app that dosent exist grab and redirect to the index page
app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

const port = process.env.PORT || 8000;

app.listen(5000, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});