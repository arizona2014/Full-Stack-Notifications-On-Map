const express = require('express');
const router = express.Router();
const Marker            = require('../models/marker');
const mongoose          = require('mongoose');
mongoose.Promise        = global.Promise;

/*
 --- stdout
 stdin ---    --- stderr
 --- exit code
 */

mongoose.connect('mongodb://localhost:27017/mysgel-api', err => {
    if (err) return console.error(err);
});

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get markers
router.get('/markers', (req, res) => {
    Marker.find().then(data => {
        res.json({
            data,
            status: 200,
            message: null
        });
    }).catch(err => {
        sendError(err, res);
    });
});


router.post('/markers', function(req, res) {
    var newMarker = new Marker(req.body);

    newMarker.save().then(
        marker => res.json(marker)
    ).catch(
        err => sendError(err, res)
    )
});

module.exports = router;