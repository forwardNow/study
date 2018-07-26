import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../shared/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  formModel: FormGroup;

  categories: string[];

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.formModel = fb.group({
      title: ['', Validators.minLength(3)],
      price: [null, this.positiveNumberValidator],
      category: ['-1']
    });
  }

  ngOnInit() {
    this.categories = this.productService.getAllCategories();
  }

  handleSearch() {
    if (this.formModel.valid) {
      console.log(this.formModel.value);
    }
  }

  positiveNumberValidator(control: FormControl): any {
    const value = control.value;

    if (!value) {
      return null;
    }

    const price = parseFloat(value);

    return price > 0 ? null : {positiveNumber: true};
  }
}
