module.exports = function(app) {
    app.get('/api/v1/auth/login', function(req, res){
        res.json({
            success: true,
            payload: {
    
            }
        });
    });
};