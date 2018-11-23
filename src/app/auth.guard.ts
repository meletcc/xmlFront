import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router) {
  }

  /**
   * 路由守卫：实现接口 CanActivate 的一个服务
   * 把路由判定功能写到这，控制是否允许进入某路由
   * canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean;
   */
  canActivate() {
    const token = window.sessionStorage.getItem('auto_token');
    // 如果不是这个token，导航到登录页面
    if (!token) {
      this.router.navigate(['/signin']);
      return false;
    }
    // 放行
    return true;
  }
}
