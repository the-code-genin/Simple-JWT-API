const express = require('express');
const dotenv = require('dotenv');
const handlebars = require('express3-handlebars');
const path = require('path');


// Configure app.
dotenv.config();
const app = express();
app.set('app_url', process.env.APP_URL);
app.set('app_key', process.env.APP_KEY);
app.set('port', process.env.PORT || 8080);
app.engine('handlebars', handlebars.create({ defaultLayout:'main' }).engine);
app.set('view engine', 'handlebars');


// Middlewares
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(require('body-parser').json());
app.use('/api/*', require('cors')());


// Register routes.
require('./routes')(app);


// custom 404 page
app.use(function(req, res, next){
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


// custom 500 page
app.use(function(err, req, res, next){
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


// Start server.
app.listen(app.get('port'), () => {
    console.log(`App running on ${app.get('app_url')}`);
});
