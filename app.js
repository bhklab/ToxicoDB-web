const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// setting the path of the router file to variable so that we can use all the routes from it.
const router = require('./routes/router.js');

// Bodyparser Middleware
app.use(bodyParser.json());


// this will set/use our api to initial path of /api.
app.use('/api', router);


// use 5000 port no. for server.
const port = process.env.PORT || 5000;


// start the server using port 5000.
app.listen(port, () => {
    console.log('Server Started');
})