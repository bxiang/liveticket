'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs');
var _ = require('lodash');

// Walk function to recursively get files
var _walk = function(root, includeRegex, excludeRegex, removePath) {
	var output = [];
	var directories = [];

	// First read through files 
	fs.readdirSync(root).forEach(function(file) {
		var newPath = root + '/' + file;
		var stat = fs.statSync(newPath);

		if (stat.isFile()) {
			if (includeRegex.test(file) && (!excludeRegex || !excludeRegex.test(file))) {
				output.push(newPath.replace(removePath, ''));
			}
		} else if (stat.isDirectory()) {
			directories.push(newPath);
		}
	});

	// Then recursively add directories
	directories.forEach(function(directory) {
		output = output.concat(_walk(directory, includeRegex, excludeRegex, removePath));
	});

	return output;
};


var _initUser = function(db) { 
	var User = db.model('User');
	User.remove().exec();
	
	var thisUser = new User({
		firstName: 'Brian',
		lastName: 'Xiang',
		displayName: 'Brian Xiang',
		email: 'brian.xiang@gmail.com',
		username: 'bxiang',
		password: 'password',
		provider: 'local'
	});
	thisUser.save();
};

var _findUser = function(db) {
	var User = db.model('User');
	var thisUser;
	thisUser = User.findOne(
		{
			username: 'bxiang' 
		}, function(err, obj) {
			console.log(obj);
		}
	);
	return thisUser;
};

var _initArticle = function(db) { 
	var User = db.model('User');
	var Article = db.model('Article');
	Article.remove().exec();
	
	var article;
	User.findOne({ 
		username: 'bxiang' 
		}, function(err, obj) {
			console.log(obj);
			for ( var i = 0; i < 20; i++) {
				article = new Article({
					title: 'Article Title ' + i,
					content: 'Article Content ' + i,
					user: obj
				});
				article.save();
			}
		});
};


var _getLatitude = function() {
	return (43 + (_.random(740000, 810000) /1000000)).toPrecision(8);
};

var _getLongitude = function() {
	return (-79 - (_.random(340000, 460000) /1000000)).toPrecision(8);
};

var _initMap = function(db) { 
	var User = db.model('User');
	var Imap = db.model('Imap');
	Imap.remove().exec();
	
	var imap;
	User.findOne({ 
		username: 'bxiang' 
	}, function(err, obj) {
		for ( var i = 0; i < 20; i++) {
			imap = new Imap({
				name: 'H' + i,
				gps: {
					coordinates: [_getLongitude(), _getLatitude()]
				},
				user: obj
			});
			imap.save();
		}
	});

};


var _initData = function(db) {
	_initUser(db);
	setTimeout(function(){_initArticle(db);}, 2000);
	setTimeout(function(){_initMap(db);}, 3000);
};


exports.walk = _walk;
exports.initData = _initData;
