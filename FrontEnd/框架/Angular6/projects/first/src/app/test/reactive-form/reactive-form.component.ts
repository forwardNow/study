import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  formModel: FormGroup = new FormGroup({
    username: new FormControl('forwardNow'),
    dateRange: new FormGroup({
      from: new FormControl(),
      to: new FormControl()
    }),
    emails: new FormArray([
      new FormControl('wuqinfei@qq.com'),
      new FormControl('wuqinfei@163.com')
    ])
  });

  constructor() {
  }

  ngOnInit() {
  }

  handleSubmit() {
    console.log(this.formModel.value);
  }

  handleAddEmail() {
    const emails = this.formModel.get('emails') as FormArray;
    emails.push(new FormControl());
  }
}
