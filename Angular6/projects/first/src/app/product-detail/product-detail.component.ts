import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  title: string;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.params.productTitle;
  }

}
