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

  getLog(pageNum: number, pageSize: number, startDate: String, endDate: String): any {
    const params = new HttpParams()
      .set('pageNum', pageNum.toString())
      .set('pageSize', pageSize.toString())
      .set('startDate', startDate.toString())
      .set('endDate', endDate.toString());
    return this.http.post(this.baseurl + '/list', params);
  }
}
