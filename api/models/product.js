const mongoose = require('mongoose');

//DB schema for a model (Layout of the DB)
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

module.exports = mongoose.model('Product', productSchema);