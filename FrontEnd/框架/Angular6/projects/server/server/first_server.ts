import * as express from 'express';
import { Product, ProductService } from "./product.service";
import * as path from 'path';

const app = express();
const productService: ProductService = new ProductService();

// 响应：GET /
const staticRootPath = path.join( __dirname, '..', 'static' );
app.use( '/', express.static( staticRootPath ) );

// 响应：GET /products
app.get( '/api/products', ( req, res ) => {
    let result = productService.getProducts();
    let params = req.query;

    result = result.filter( ( product: Product ) => {
        let isOk = true;
        if ( isOk && params.title ) {
            isOk = product.title.indexOf( params.title ) !== -1;
        }
        if ( isOk && params.price ) {
            isOk = product.price <= params.price;
        }
        if ( isOk && params.category !== '-1' ) {
            isOk = product.categories.indexOf( params.category ) !== -1;
        }
        return isOk;
    } );


    return res.json( result );
} );

app.get( '/api/product/:id', ( req, res ) => {
    res.json( productService.getProductById( req.params.id ) );
} );

app.get( '/api/product/:id/comments', ( req, res ) => {
    res.json( productService.getCommentsByProductId( req.params.id ) );
} );

const server = app.listen( 8000, 'localhost', () => {
    console.log( '服务器已启动，请访问：http://localhost:8000' )
} );