const path = require('path')

const express = require('express')


const router = express.Router()

const productsController = require('../controllers/products')

router.get('/', productsController.getIndex)

router.get('/products', productsController.getProducts)

router.get('/cart', productsController.getCart)

router.get('/orders', productsController.getOrders)

router.get('/checkout', productsController.getCheckout)

module.exports = router
