import {Component, OnInit} from '@angular/core';
import {Product, ProductService} from '../shared/product.service';
import {FormControl} from '@angular/forms';
import 'rxjs/Rx';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public products: Array<Product>;

  keyword: string;

  titleField: FormControl = new FormControl();

  constructor(private productService: ProductService) {
    this.titleField.valueChanges
      .debounceTime(500)
      .subscribe( value => {
        this.keyword = value;
      } );

  }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

}

