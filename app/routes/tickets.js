'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var tickets = require('../../app/controllers/tickets');

	// Tickets Routes
	app.get('/tickets', tickets.list);
	app.post('/tickets', users.requiresLogin, tickets.create);
	app.get('/tickets/:ticketId', tickets.read);
	app.put('/tickets/:ticketId', users.requiresLogin, tickets.hasAuthorization, tickets.update);
	app.del('/tickets/:ticketId', users.requiresLogin, tickets.hasAuthorization, tickets.delete);

	// Finish by binding the Ticket middleware
	app.param('ticketId', tickets.ticketByID);
};