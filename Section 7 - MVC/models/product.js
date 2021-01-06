const fs = require('fs')
const path = require('path')
const rootDir = require('../util/path')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
)

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([])
    } else {
      cb(JSON.parse(fileContent))
    }
  })
}

module.exports = class Product {
  constructor(t) {
    this.title = t
  }

  save() {
    getProductsFromFile(products => {
      products.push(this)
      fs.writeFile(p, JSON.stringify(products, null, 2), (err) => {
        console.log(err)
      })
    })
  }

  static async fetchAll(cb) {
    getProductsFromFile(cb)
  }
}