var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MarkerSchema   = new Schema({
    label: String,
    lat: Number,
    lng: Number,
    draggable: Boolean,
    icon: String
});

module.exports = mongoose.model('Marker', MarkerSchema);
