import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';


@Component({
  selector: 'app-reactive-regist',
  templateUrl: './reactive-regist.component.html',
  styleUrls: ['./reactive-regist.component.css']
})
export class ReactiveRegistComponent implements OnInit {


  formModel: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.formModel = formBuilder.group({
      // 内置校验器
      username: ['', [Validators.required, Validators.minLength(6)]],
      // 自定义同步校验器
      mobile: ['', this.mobileValidator],
      // FromGroup 校验器器
      passwordGroup: formBuilder.group({
        password: ['', Validators.required],
        // 异步校验器，作为第三个参数
        pwdRepeat: ['', '', this.asyncValidator]
      }, {
        validator: this.equalsValidator
      })
    });
  }

  ngOnInit() {
  }

  handleSubmit() {
    console.log('username', this.formModel.get('username').errors);
    console.log('mobile', this.formModel.get('mobile').errors);
    console.log('passwordGroup', this.formModel.get('passwordGroup').errors);
    console.log(this.formModel.value);
  }

  mobileValidator(control: AbstractControl): { [key: string]: any } {
    const value = control.value;
    if (!/[0-9]{3,}/.test(value)) {
      return {
        mobile: true
      };
    }
    return null;
  }

  equalsValidator(group: FormGroup): { [key: string]: any } {
    const password = group.get('password').value;
    const pwdRepeat = group.get('pwdRepeat').value;
    if (password !== pwdRepeat) {
      return {
        equals: {
          msg: '不一致'
        }
      };
    }
    return null;
  }

  asyncValidator(control: AbstractControl): { [key: string]: any } {
    const value = control.value;
    const valid = /[0-9]{3,}/.test(value);
    return Observable.of(valid ? null : {asyncV: true}).delay(2000);
  }
}
