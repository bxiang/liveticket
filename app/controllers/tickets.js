'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Ticket = mongoose.model('Ticket'),
	_ = require('lodash');

/**
 * Create a Ticket
 */
exports.create = function(req, res) {
	var ticket = new Ticket(req.body);
	ticket.reporter = req.user;

	ticket.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				ticket: ticket
			});
		} else {
			res.jsonp(ticket);
		}
	});
};

/**
 * Show the current Ticket
 */
exports.read = function(req, res) {
	res.jsonp(req.ticket);
};

/**
 * Update a Ticket
 */
exports.update = function(req, res) {
	var ticket = req.ticket;

	ticket = _.extend(ticket, req.body);

	ticket.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(ticket);
		}
	});
};

/**
 * Delete an Ticket
 */
exports.delete = function(req, res) {
	var ticket = req.ticket;

	ticket.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(ticket);
		}
	});
};

/**
 * List of Tickets
 */
exports.list = function(req, res) {
	Ticket.find().sort('-created').populate('reporter', 'displayName').exec(function(err, tickets) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(tickets);
		}
	});
};

/**
 * Ticket middleware
 */
exports.ticketByID = function(req, res, next, id) {
	Ticket.findById(id).populate('reporter', 'displayName').exec(function(err, ticket) {
		if (err) return next(err);
		if (!ticket) return next(new Error('Failed to load Ticket ' + id));
		req.ticket = ticket;
		next();
	});
};

/**
 * Ticket authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.ticket.reporter.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};