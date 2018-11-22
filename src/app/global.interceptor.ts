import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

// 全局拦截器把所：有请求或者响应拦截进行处理，实现 HttpInterceptor 接口
@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  /**
   * 拦截器方法
   * @param req http请求
   * @param next http处理
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 把所有请求头更改
    // 如果是用户登录或者注册忽略检查token
    // if (req.url.includes('login')) {
      return next.handle(req);
 /*   }
    const authReq = req.clone({setHeaders: {'authorization': window.sessionStorage.getItem('auto_token')}});
    return next.handle(authReq);*/
  }
}
