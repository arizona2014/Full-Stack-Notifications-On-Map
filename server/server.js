// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mysgel-api'); // connect to our database
var Marker = require('./app/models/marker');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /markers
// ----------------------------------------------------
router.route('/markers')

	// create a marker (accessed at POST http://localhost:8080/api/markers)

    .post(function(req, res) {

        var marker = new Marker();		            // create a new instance of the Marker model
        Marker.label = req.body.label;              // set the markers name (comes from the request)
        Marker.lat = req.body.lat;                  // set the markers name (comes from the request)
        Marker.lng = req.body.lng;                  // set the markers name (comes from the request)
        Marker.draggable = req.body.draggable;      // set the markers name (comes from the request)
        Marker.icon = req.body.icon;              // set the markers name (comes from the request)

        marker.save(function(err) {

            if (err)  res.send(err);
            res.json({ message: 'Marker created!' });

        });

    })

	// get all the markers (accessed at GET http://localhost:8080/api/markers)
	.get(function(req, res) {

        Marker.find(function(err, markers) {

			if (err) res.send(err);
			res.json(markers);

		});

	});

// on routes that end in /markers/:marker_id
// ----------------------------------------------------
router.route('/markers/:marker_id')

	// get the marker with that id
	.get(function(req, res) {

        Marker.findById(req.params.marker_id, function(err, marker) {

			if (err) res.send(err);
			res.json(marker);

		});

	})

	// update the marker with this id
	.put(function(req, res) {

        Marker.findById(req.params.marker_id, function(err, marker) {

			if (err) res.send(err);

            marker.name = req.body.name;
            marker.save(function(err) {

				if (err) res.send(err);
				res.json({ message: 'Marker updated!' });

			});

		});

	})

	// delete the marker with this id
	.delete(function(req, res) {

        Marker.remove({

			_id: req.params.marker_id

		}, function(err, marker) {

			if (err) res.send(err);
			res.json({ message: 'Successfully deleted' });

		});

	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
