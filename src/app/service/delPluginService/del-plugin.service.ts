import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DelPluginService {

  baseurl;

  constructor(
    private http: HttpClient
  ) {
    this.baseurl = '/plugin';
  }

  delPlugin(pluginId: string): any {
    const params = new HttpParams()
      .set('pluginId', pluginId.toString());
    return this.http.post(this.baseurl + '/del', params);
  }
}
