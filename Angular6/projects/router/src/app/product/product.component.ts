import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id: number;

  constructor( private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    // this.id = this.activatedRoute.snapshot.queryParams.id;
    // this.id = this.activatedRoute.snapshot.params.id;
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        this.id = params.id;
      }
    );
  }

}
