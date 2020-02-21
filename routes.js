const express = require('express');
const bodyParser = require('body-parser');

const Router = express.Router();
const JSONParser = bodyParser.json();

const controller = require('./controller');

Router.get('/all-visits', controller.getAllVisits);
Router.get('/checked-in-visits', controller.getCheckedInVisitors);

Router.post('/check-out', JSONParser, controller.checkOutVisitor);
Router.post('/new-visit', JSONParser, controller.addNewVisitor);

module.exports = Router;
