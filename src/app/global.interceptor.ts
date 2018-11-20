import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';

// 把所有请求或者响应拦截处理
@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    // 把所有请求头更改
    // 如果是用户登录或者注册忽略检查token
    // if (req.url.includes('session') || req.url.includes('users')) {
      return next.handle(req);
    // }
    //const authReq = req.clone({setHeaders: {'X-Access-Token': window.localStorage.getItem('auto_token')}});
    //return next.handle(authReq);
  }
}
