import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public products: Array<Product>;

  ngOnInit() {
    this.products = [
      new Product(1, '商品1', 11, 1.5, '商品描述1', ['类别1', '类别2']),
      new Product(2, '商品2', 12, 2.5, '商品描述2', ['类别2', '类别2']),
      new Product(3, '商品3', 13, 3.5, '商品描述3', ['类别3', '类别2']),
      new Product(4, '商品4', 14, 4.5, '商品描述4', ['类别4', '类别2']),
      new Product(5, '商品5', 15, 5.0, '商品描述5', ['类别5', '类别2']),
      new Product(6, '商品6', 16, 1.5, '商品描述6', ['类别6', '类别2']),
    ];
  }

}

export class Product {
  constructor(
    public id: number,
    public title: string,
    public  price: number,
    public rating: number,
    public  desc: string,
    public  categories: Array<string>
  ) { }
}
