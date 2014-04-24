'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Imap = mongoose.model('Imap'),
	_ = require('lodash');

/**
 * Create a Imap
 */
exports.create = function(req, res) {
	var imap = new Imap(req.body);
	imap.user = req.user;

	imap.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				imap: imap
			});
		} else {
			res.jsonp(imap);
		}
	});
};

/**
 * Show the current Imap
 */
exports.read = function(req, res) {
	res.jsonp(req.imap);
};

/**
 * Update a Imap
 */
exports.update = function(req, res) {
	var imap = req.imap;

	imap = _.extend(imap, req.body);

	imap.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(imap);
		}
	});
};

/**
 * Delete an Imap
 */
exports.delete = function(req, res) {
	var imap = req.imap;

	imap.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(imap);
		}
	});
};

/**
 * List of Imaps
 */
exports.list = function(req, res) {
	Imap.find().sort('-created').populate('user', 'displayName').exec(function(err, imaps) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(imaps);
		}
	});
};

/**
 * Imap middleware
 */
exports.imapByID = function(req, res, next, id) {
	Imap.findById(id).populate('user', 'displayName').exec(function(err, imap) {
		if (err) return next(err);
		if (!imap) return next(new Error('Failed to load Imap ' + id));
		req.imap = imap;
		next();
	});
};

/**
 * Imap authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.imap.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};
