'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var imaps = require('../../app/controllers/imaps');

	// Imaps Routes
	app.get('/imaps', imaps.list);
	app.post('/imaps', users.requiresLogin, imaps.create);
	app.get('/imaps/:imapId', imaps.read);
	app.put('/imaps/:imapId', users.requiresLogin, imaps.hasAuthorization, imaps.update);
	app.del('/imaps/:imapId', users.requiresLogin, imaps.hasAuthorization, imaps.delete);

	// Finish by binding the Imap middleware
	app.param('imapId', imaps.imapByID);
};