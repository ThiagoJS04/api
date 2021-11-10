const { Router } = require('express');

const UserController = require('./app/controllers/UserController');
const LoginController = require('./app/controllers/LoginController');



const routes = new Router();


routes.post('/users', UserController.store);
routes.delete('/users/:id', UserController.delete); 
routes.post('/login', LoginController.store);

routes.get('/', (req, res) => {
    let name = 'Thiago tudo bem !?'
    res.send(`Hello World ${name}!`);

})

module.exports = routes;