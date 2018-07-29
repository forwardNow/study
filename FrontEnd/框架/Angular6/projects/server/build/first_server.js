"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var product_service_1 = require("./product.service");
var path = require("path");
var app = express();
var productService = new product_service_1.ProductService();
// 响应：GET /
var staticRootPath = path.join(__dirname, '..', 'static');
app.use('/', express.static(staticRootPath));
// 响应：GET /products
app.get('/api/products', function (req, res) {
    var result = productService.getProducts();
    var params = req.query;
    result = result.filter(function (product) {
        var isOk = true;
        if (isOk && params.title) {
            isOk = product.title.indexOf(params.title) !== -1;
        }
        if (isOk && params.price) {
            isOk = product.price <= params.price;
        }
        if (isOk && params.category !== '-1') {
            isOk = product.categories.indexOf(params.category) !== -1;
        }
        return isOk;
    });
    return res.json(result);
});
app.get('/api/product/:id', function (req, res) {
    res.json(productService.getProductById(req.params.id));
});
app.get('/api/product/:id/comments', function (req, res) {
    res.json(productService.getCommentsByProductId(req.params.id));
});
var server = app.listen(8000, 'localhost', function () {
    console.log('服务器已启动，请访问：http://localhost:8000');
});
