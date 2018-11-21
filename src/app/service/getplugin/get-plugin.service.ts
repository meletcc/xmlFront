import {Injectable} from '@angular/core';
import {DatePipe} from '@angular/common';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetPluginService {

  baseurl;

  constructor(
    private http: HttpClient
  ) {
    this.baseurl = '/opm';
  }

  getLog(pageNum: number, pageSize: number): any {
    const params = new HttpParams()
      .set('pageNum', pageNum.toString())
      .set('pageSize', pageSize.toString())
    return this.http.post(this.baseurl + '/list', params);
  }
}
