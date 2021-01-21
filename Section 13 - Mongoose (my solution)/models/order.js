const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: Array,
  user: {
    _id: mongoose.Types.ObjectId,
    name: String
  }
});

module.exports = mongoose.model('Orders', orderSchema);