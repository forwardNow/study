import {FormControl, FormGroup} from '@angular/forms';

export function mobileValidator(control: FormControl): any {
  const reg = /[0-9]{11}/;
  const valid = reg.test(control.value);
  return valid ? null : {mobile: true};
}

export function equalValidator(group: FormGroup): any {
  const password: FormControl = group.get('password') as FormControl;
  const pConfirm: FormControl = group.get('pConfirm') as FormControl;
  let valid = false;
  if (password && pConfirm) {
    valid = password.value === pConfirm.value;
  }
  return valid ? null : {equal: true};
}
