import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GetLogService {

  baseurl;

  constructor(
    private datePipe: DatePipe,
    private http: HttpClient
  ) {
    this.baseurl = '/record';
  }

  getLog(pageNum: number, pageSize: number, startDate: Date, endDate: Date): any {
    const params = new HttpParams()
      .set('pageNum', pageNum.toString())
      .set('pageSize', pageSize.toString())
      .set('startDate', this.datePipe.transform(startDate, 'yyyy-MM-dd HH:mm:ss'))
      .set('endDate', this.datePipe.transform(endDate, 'yyyy-MM-dd HH:mm:ss'));
    return this.http.post(this.baseurl + '/list', params);
  }
}
