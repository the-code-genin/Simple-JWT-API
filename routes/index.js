module.exports = function(app) {
    app.get('/', (req, res) => {
        res.render('index.handlebars');
    });

    require('./auth')(app);
}