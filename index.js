const express = require('express');
const dotenv = require('dotenv');

// Configure app.
dotenv.config();
const app = express();
app.set('port', process.env.PORT || 8080);


app.get('/', function(req, res){
    res.type('text/plain');
    res.send('Hello world!');
});


// custom 404 page
app.use(function(req, res, next){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

// custom 500 page
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), () => {
    console.log(`App running on http://localhost:${process.env.PORT}`);
});
