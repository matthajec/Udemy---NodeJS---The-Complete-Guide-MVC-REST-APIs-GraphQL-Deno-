const mongoose = require('mongoose');
const User = require('./user');

const productSchema = new mongoose.Schema({
  title: String,
  price: String,
  description: String,
  imageUrl: String,
  userId: mongoose.Schema.Types.ObjectId
});

productSchema.statics.findById = function (id) {
  return this.findOne({ _id: id });
};

productSchema.statics.deleteById = function (id) {
  return this.deleteOne({ _id: id });
};

productSchema.statics.fetchAll = function () {
  return this.find();
};

module.exports = mongoose.model('Product', productSchema);