const Router = require('express');
const routher = new Router();
const controller = require('./authController'); 

routher.post( path, '/registration', controller.registration);
routher.post( path, 'login', controller.login);
routher.get('/users', controller.getUsers);

module.exports = routher;
