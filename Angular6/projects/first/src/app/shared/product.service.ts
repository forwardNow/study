import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Array<Product> = [
    new Product(1, '商品1', 11, 1.5, '商品描述1', ['类别1', '类别2']),
    new Product(2, '商品2', 12, 2.5, '商品描述2', ['类别2', '类别2']),
    new Product(3, '商品3', 13, 3.5, '商品描述3', ['类别3', '类别2']),
    new Product(4, '商品4', 14, 4.5, '商品描述4', ['类别4', '类别2']),
    new Product(5, '商品5', 15, 5.0, '商品描述5', ['类别5', '类别2']),
    new Product(6, '商品6', 16, 1.5, '商品描述6', ['类别6', '类别2']),
  ];

  comments: Comment[] = [
    new Comment(1, 1, '2018-01-18', '吴钦飞1', 1, '不错1'),
    new Comment(2, 2, '2018-02-18', '吴钦飞2', 2, '不错2'),
    new Comment(3, 1, '2018-03-18', '吴钦飞3', 3, '不错3'),
    new Comment(4, 2, '2018-04-18', '吴钦飞4', 4, '不错4'),
  ];

  constructor() {
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product {

    return this.products.find((product) => {
      return  Number( id ) === product.id;
    });
  }

  getCommentsByProductId(id: number): Comment[] {
    return this.comments.filter((comment: Comment) => {
      return comment.productId === Number( id );
    });
  }
}

export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>
  ) {
  }
}

export class Comment {
  constructor(
    public id: number,
    public productId: number,
    public timestamp: string,
    public user: string,
    public rating: number,
    public content: string
  ) {
  }
}
