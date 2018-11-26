import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

/**
 * HTTP拦截器：把所有请求或者响应拦截进行处理
 * 只是一个实现特定接口 HttpInterceptor的 Angular-service
 */
@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 如果是用户的请求 url 是登录或者注册忽略检查 token
    if (req.url.includes('login')) {
      return next.handle(req);
    }
    // 添加自定义请求头 authorization 赋值为传递过来的 token，除了登录注册其他请求就都带着 token
    const authReq = req.clone({setHeaders: {'authorization': window.sessionStorage.getItem('auto_token')}});
    // 传递修改后的请求对象
    return next.handle(authReq);
  }
}
