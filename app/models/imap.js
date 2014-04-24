'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Imap Schema
 */
var ImapSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Imap name',
		trim: true
	},
	latitude: {
		type: Number,
	},
	longitude: {
		type: Number,
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Imap', ImapSchema);