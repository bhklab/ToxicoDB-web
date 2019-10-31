/* eslint-disable no-console */
/* eslint-disable import/newline-after-import */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Bodyparser Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// setting the path of the router file to variable so that we can use all the routes from it.
const router = require('./routes/router.js');

// this will set/use our api to initial path of /api.
app.use('/api', router);

app.get('/*', (req, res) => {
    res.sendFile('index.html', { root: './client/build' });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});


// use 5000 port no. for server.
const port = process.env.PORT || 5000;

// start the server using port 5000.
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Server Started at ', port);
});
