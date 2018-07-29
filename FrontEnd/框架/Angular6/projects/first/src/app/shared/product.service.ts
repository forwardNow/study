import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter<ProductSearchParams>();

  constructor(private http: HttpClient) {
  }

  getAllCategories() {
    return ['类别1', '类别2', '类别3', '类别4', '类别5', '类别6'];
  }

  getProducts(): Observable<Product[]> {
    return this.http.get('/api/products') as Observable<Product[]>;
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get('/api/product/' + id) as Observable<Product>;
  }

  getCommentsByProductId(id: number): Observable<Comment[]> {
    return this.http.get(`/api/product/${id}/comments`) as Observable<Comment[]>;
  }

  search(params: ProductSearchParams): Observable<Product[]> {
    return this.http.get('/api/products', {
      params: this.encodeParam(params)
    }) as Observable<Product[]>;
  }

  private encodeParam(params: ProductSearchParams): HttpParams {
    return Object.keys(params)
      .filter(key => params[key])
      .reduce((sum: HttpParams, key: string) => {
        return sum.append(key, params[key]);
      }, new HttpParams())
      ;
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

export class ProductSearchParams {
  constructor(public title: string,
              public price: number,
              public category: string) {
  }
}
