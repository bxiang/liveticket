'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Imap = mongoose.model('Imap');

/**
 * Globals
 */
var user, imap ;

/**
 * Unit tests
 */
describe('Imap Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			imap = new Imap ({
				name: 'Imap Name',
				latitude: 45.096787,
				longitude: 67.40009,
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return imap .save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			imap .name = '';

			return imap .save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Imap .remove().exec();

		User.remove().exec();
		done();
	});
});