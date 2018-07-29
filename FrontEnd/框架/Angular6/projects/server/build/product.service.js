"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProductService = /** @class */ (function () {
    function ProductService() {
        this.products = [
            new Product(1, '商品1', 11, 1.5, '商品描述1', ['类别1', '类别2']),
            new Product(2, '商品2', 12, 2.5, '商品描述2', ['类别2', '类别2']),
            new Product(3, '商品3', 13, 3.5, '商品描述3', ['类别3', '类别2']),
            new Product(4, '商品4', 14, 4.5, '商品描述4', ['类别4', '类别2']),
            new Product(5, '商品5', 15, 5.0, '商品描述5', ['类别5', '类别2']),
            new Product(6, '商品6', 16, 1.5, '商品描述6', ['类别6', '类别2']),
        ];
        this.comments = [
            new Comment(1, 1, '2018-01-18', '吴钦飞1', 1, '不错1'),
            new Comment(2, 2, '2018-02-18', '吴钦飞2', 2, '不错2'),
            new Comment(3, 1, '2018-03-18', '吴钦飞3', 3, '不错3'),
            new Comment(4, 2, '2018-04-18', '吴钦飞4', 4, '不错4'),
        ];
    }
    ProductService.prototype.getAllCategories = function () {
        return ['类别1', '类别2', '类别3', '类别4', '类别5', '类别6'];
    };
    ProductService.prototype.getProducts = function () {
        return this.products;
    };
    ProductService.prototype.getProductById = function (id) {
        return this.products.find(function (product) {
            return Number(id) === product.id;
        });
    };
    ProductService.prototype.getCommentsByProductId = function (id) {
        return this.comments.filter(function (comment) {
            return comment.productId === Number(id);
        });
    };
    return ProductService;
}());
exports.ProductService = ProductService;
var Product = /** @class */ (function () {
    function Product(id, title, price, rating, desc, categories) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Product;
}());
exports.Product = Product;
var Comment = /** @class */ (function () {
    function Comment(id, productId, timestamp, user, rating, content) {
        this.id = id;
        this.productId = productId;
        this.timestamp = timestamp;
        this.user = user;
        this.rating = rating;
        this.content = content;
    }
    return Comment;
}());
exports.Comment = Comment;
