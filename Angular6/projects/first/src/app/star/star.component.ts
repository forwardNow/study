import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {

  @Input()
  public rating: number;

  public starts: Array<boolean> = [];

  constructor() {

  }

  ngOnInit() {

    for ( let i = 1; i <= 5; i++) {
      this.starts.push( i > this.rating );
    }
    // this.starts = [ false, false, true, true, true ];
  }

}
