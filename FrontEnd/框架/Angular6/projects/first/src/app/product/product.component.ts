import {Component, OnInit} from '@angular/core';
import {Product, ProductSearchParams, ProductService} from '../shared/product.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public products: Observable<Product[]>;


  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.productService.searchEvent.subscribe((params: ProductSearchParams) => {
      this.products = this.productService.search(params);
    });
  }


}

