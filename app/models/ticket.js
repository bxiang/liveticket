'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Ticket Schema
 */
var TicketSchema = new Schema({
	// number: {
	// 	type: String,
	// 	unique: true,
	// 	required: 'Ticket number is required'
	// },
	description: {
		type: String,
		default: '',
		required: 'Please fill description',
		trim: true
	},
	detail: {
		type: String,
		default: '',
		trim: true
	},
	priority: {
		type: String,
		trim: true
	},
	severity: {
		type: String,
		trim: true
	},
	// assignee: {
	// 	type: Schema.ObjectId,
	// 	ref: 'User'
	// },
	reporter: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Ticket', TicketSchema);