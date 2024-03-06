const { Router } = require('express'),
    route = Router();

route.get('/', async(req, res) => {
    res.render('index')
})

module.exports = route;