import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit, OnChanges {

  @Input()
  public rating: number;
  @Output()
  public ratingChange: EventEmitter<number> = new EventEmitter();

  public starts: Array<boolean> = [];

  @Input()
  public readonly = true;

  constructor() {

  }

  ngOnInit() {
  }

  public handleRating(statNum: number): void {
    if (this.readonly !== false) {
      return;
    }
    this.showStars(statNum);
  }

  private showStars(statNum = this.rating) {
    this.starts = [];
    for (let i = 1; i <= 5; i++) {
      this.starts.push(i > statNum);
    }
    this.ratingChange.emit( statNum );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.showStars();
  }
}
