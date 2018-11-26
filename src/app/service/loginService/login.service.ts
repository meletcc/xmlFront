import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseurl;

  // httpOptions;

  constructor(
    private http: HttpClient
  ) {
    this.baseurl = '/login';
    // this.httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': 'my-auth-token'
    //   })
    // };
  }

  login(name, pwd) {
    // 定义Http参数，要和服务器匹配，进行通讯
    const params = new HttpParams()
      .set('name', name)
      .set('pwd', pwd);
    return this.http.post(this.baseurl, params);
  }
}
