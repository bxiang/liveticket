'use strict';

var path = require('path'),
	rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	app: {
		title: 'Live Ticket',
		description: 'A simple ticket system',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI,
	root: rootPath,
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'live-ticket',
	sessionCollection: 'sessions'
};