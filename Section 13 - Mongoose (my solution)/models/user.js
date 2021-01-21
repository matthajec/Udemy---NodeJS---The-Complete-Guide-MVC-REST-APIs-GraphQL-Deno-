const mongoose = require('mongoose');
const Product = require('./product');
const Order = require('./order');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  cart: {
    items: [{
      productId: mongoose.Schema.Types.ObjectId,
      quantity: Number
    }]
  }
});

userSchema.statics.findById = function (id) {
  return this.findOne({ _id: id });
};

userSchema.methods.getCart = function () {
  const productIds = this.cart.items.map(i => i.productId);

  return Product.find({ _id: { $in: productIds } })
    .then(products => {
      return products.map(p => {
        return {
          ...p._doc,
          quantity: this.cart.items.find(i => {
            return i.productId.toString() === p._id.toString();
          }).quantity
        };
      });
    });
};

userSchema.methods.addToCart = function (prodId) {
  const productIndex = this.cart.items.findIndex(p => {
    return p.productId.toString() === prodId.toString();
  });
  if (productIndex < 0) {
    this.cart.items.push({
      productId: prodId,
      quantity: 1
    });
  } else {
    this.cart.items[productIndex].quantity++;
  }

  return this.save();
};

userSchema.methods.deleteItemFromCart = function (prodId) {
  const productIndex = this.cart.items.findIndex(p => {
    return p.productId.toString() === prodId.toString();
  });

  this.cart.items.splice(productIndex, 1);

  return this.save();
};

userSchema.methods.addOrder = function () {
  return this.getCart()
    .then(products => {
      const order = new Order({
        items: products,
        user: {
          _id: this._id,
          name: this.name
        }
      });
      return order.save();
    })
    .then(() => {
      this.cart.items = [];
      return this.save();
    });
};

userSchema.methods.getOrders = function () {
  return Order.find({ 'user._id': this._id });
};


module.exports = mongoose.model('User', userSchema);