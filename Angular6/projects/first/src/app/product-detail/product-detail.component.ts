import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, Comment, ProductService} from '../shared/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  comments: Comment[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {
  }

  ngOnInit() {
    const productId = this.activatedRoute.snapshot.params.productId;
    this.product = this.productService.getProductById(productId);
    this.comments = this.productService.getCommentsByProductId(productId);
  }

}
