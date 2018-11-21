import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router) {
  }

  // 把路由判定功能写到这
  // 控制是否允许进入路由
  canActivate() {
    const token = window.localStorage.getItem('auto_token');
    // if (!token) {
    //   this.router.navigate(['/signin']);
    //   return false;
    // }
    // 放行
    return true;
  }
}
