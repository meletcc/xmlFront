import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DelService {

  constructor(
    private http: HttpClient
  ) {
  }

  // 删除插件
  delPlugin(pluginId: string): any {
    const params = new HttpParams()
      .set('pluginId', pluginId.toString());
    return this.http.post('/plugin/del', params);
  }

  // 删除全量备份
  // delfullback(fullBackupId: string): any {
  //   const params = new HttpParams()
  //     .set('fullBackupId', fullBackupId.toString());
  //   return this.http.post('/fullBackup/del', params);
  // }
}
