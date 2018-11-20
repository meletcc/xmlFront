import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetLogService {

  baseurl;

  constructor(
    private http: HttpClient
  ) {
    this.baseurl = '/record';
  }

  getLog(limit: number, page: number) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.post(this.baseurl + "/list", params);
  }
}
