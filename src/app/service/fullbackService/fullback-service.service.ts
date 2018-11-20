import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FullbackServiceService {

  baseurl;

  constructor(
    private http: HttpClient
  ) {
    this.baseurl = '/fullBackup';
  }

  getLog(pageNum: number, pageSize: number): any {
    const params = new HttpParams()
      .set('pageNum', pageNum.toString())
      .set('pageSize', pageSize.toString());
    return this.http.post(this.baseurl + '/list', params);
  }
}
