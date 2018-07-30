import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  handleSubmit(myForm) {
    if (myForm.valid) {
      console.log('表单验证通过', myForm.value);

      // 验证通过后 重置表单
      myForm.reset();

    } else {
      console.log('表单验证不通过', myForm.value);
    }
  }


}
