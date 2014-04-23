'use strict';

(function() {
	// Imaps Controller Spec
	describe('Imaps Controller Tests', function() {
		// Initialize global variables
		var ImapsController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Imaps controller.
			ImapsController = $controller('ImapsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Imap object fetched from XHR', inject(function(Imaps) {
			// Create sample Imap using the Imaps service
			var sampleImap = new Imaps({
				name: 'New Imap'
			});

			// Create a sample Imaps array that includes the new Imap
			var sampleImaps = [sampleImap];

			// Set GET response
			$httpBackend.expectGET('imaps').respond(sampleImaps);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.imaps).toEqualData(sampleImaps);
		}));

		it('$scope.findOne() should create an array with one Imap object fetched from XHR using a imapId URL parameter', inject(function(Imaps) {
			// Define a sample Imap object
			var sampleImap = new Imaps({
				name: 'New Imap'
			});

			// Set the URL parameter
			$stateParams.imapId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/imaps\/([0-9a-fA-F]{24})$/).respond(sampleImap);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.imap).toEqualData(sampleImap);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Imaps) {
			// Create a sample Imap object
			var sampleImapPostData = new Imaps({
				name: 'New Imap'
			});

			// Create a sample Imap response
			var sampleImapResponse = new Imaps({
				_id: '525cf20451979dea2c000001',
				name: 'New Imap'
			});

			// Fixture mock form input values
			scope.name = 'New Imap';

			// Set POST response
			$httpBackend.expectPOST('imaps', sampleImapPostData).respond(sampleImapResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Imap was created
			expect($location.path()).toBe('/imaps/' + sampleImapResponse._id);
		}));

		it('$scope.update() should update a valid Imap', inject(function(Imaps) {
			// Define a sample Imap put data
			var sampleImapPutData = new Imaps({
				_id: '525cf20451979dea2c000001',
				name: 'New Imap'
			});

			// Mock Imap in scope
			scope.imap = sampleImapPutData;

			// Set PUT response
			$httpBackend.expectPUT(/imaps\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/imaps/' + sampleImapPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid imapId and remove the Imap from the scope', inject(function(Imaps) {
			// Create new Imap object
			var sampleImap = new Imaps({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Imaps array and include the Imap
			scope.imaps = [sampleImap];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/imaps\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleImap);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.imaps.length).toBe(0);
		}));
	});
}());