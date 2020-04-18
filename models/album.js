var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({ 
    title: { type: String, unique: true},
    year: Date,
    price: Number, 
});

module.exports = mongoose.model('Album', userSchema);