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

  newRating = 3;
  newComment: string;

  isAddCommentHidden = false;

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

  addComment() {
    const comment = new Comment(
      -1,
      this.product.id,
      new Date().toLocaleDateString(),
      '路人甲',
      this.newRating,
      this.newComment);
    this.comments.unshift(comment);

    this.calAvgRating();

    this.resetNewComment();
  }

  private resetNewComment() {
    this.newRating = 3;
    this.newComment = null;
    this.isAddCommentHidden = true;
  }


  private calAvgRating() {
    const sum = this.comments.reduce((total, comment) => {
      return total + comment.rating;
    }, 0);
    this.product.rating = sum / this.comments.length;
  }
}
