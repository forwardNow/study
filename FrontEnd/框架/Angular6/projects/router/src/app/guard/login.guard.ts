import {CanActivate} from '@angular/router';

export class LoginGuard implements CanActivate {
  canActivate() {
    const loggedIn: boolean = Math.random() < 0.5;
    if (!loggedIn) {
      console.info('您未登录！');
    } else {
      console.info('已登录！');
    }
    return loggedIn;
  }
}
