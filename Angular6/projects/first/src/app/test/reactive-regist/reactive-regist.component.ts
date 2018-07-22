import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-reactive-regist',
  templateUrl: './reactive-regist.component.html',
  styleUrls: ['./reactive-regist.component.css']
})
export class ReactiveRegistComponent implements OnInit {

  formModel: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.formModel = formBuilder.group({
      username: [''],
      passwordGroup: formBuilder.group({
        password: [''],
        pwdRepeat: ['']
      })
    });
  }

  ngOnInit() {
  }

  handleSubmit() {
    console.log(this.formModel.value);
  }

}
