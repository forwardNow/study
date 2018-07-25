import { Directive } from '@angular/core';
import {NG_VALIDATORS} from '@angular/forms';
import {equalValidator } from '../shared/validator';

@Directive({
  selector: '[appEqualValidator]',
  providers: [
    {provide: NG_VALIDATORS, useValue: equalValidator, multi: true}
  ]
})
export class EqualValidatorDirective {

  constructor() { }

}
