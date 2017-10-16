var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MarkerSchema   = new Schema({
    label: String,
    category: Number,
    description: String,
    lat: Number,
    lng: Number,
    created: Number,
    draggable: Boolean,
    icon: String,
    status: String
});

module.exports = mongoose.model('Marker', MarkerSchema);
