const express = require('express');
const dotenv = require('dotenv');
const handlebars = require('express3-handlebars');
const path = require('path');
const mongoose = require('mongoose');


// Configure app.
dotenv.config();
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const app = express();
app.set('app_url', process.env.APP_URL);
app.set('app_key', process.env.APP_KEY);
app.set('port', process.env.PORT || 8080);
app.engine('handlebars', handlebars.create({ defaultLayout:'main' }).engine);
app.set('view engine', 'handlebars');



// Middlewares
app.use(express.static(path.resolve(__dirname, 'public')));
app.use('/api/*', require('body-parser').json());
app.use('/api/*', require('cors')());



// Register routes.
require('./routes')(app);



// Api 404 page
app.use('/api/*', function(req, res, next){
    res.status(404);
    res.json({
        success: false,
        error: {
            code: 404,
            type: 'NotFoundError',
            message: 'The resource you were looking for was not found on this server.'
        }
    });
});


// Api 500 page
app.use('/api/*', function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.json({
        success: false,
        error: {
            code: 500,
            type: 'ServerError',
            message: err.message
        }
    });
});


// General 404 page
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});


// General 500 page
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});



// Start server.
app.listen(app.get('port'), () => {
    console.log(`App running on ${app.get('app_url')}`);
});
