import {CanDeactivate} from '@angular/router';
import {HomeComponent} from '../home/home.component';

export class UnsavedGuard implements CanDeactivate<HomeComponent> {
  canDeactivate() {
    return window.confirm( '是否要离开？' );
  }

}
