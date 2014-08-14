define(function (require) {
        Marionette = require('marionette');

        app = new Backbone.Marionette.Application();
					
		app.addInitializer(function (options) {
			console.log("app initialized");
		});

		app.on('initialize:after', function(options){
				Backbone.history.start();	 			 
		}); 


		return app.start();

});