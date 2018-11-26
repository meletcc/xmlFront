import {Component, OnInit} from '@angular/core';
import {Page} from '../../entity/page';
import {GetPluginService} from '../../service/getplugin/get-plugin.service';
import {DelService} from '../../service/delService/del.service';
import {HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {NzMessageService, UploadFile, UploadFilter, UploadXHRArgs} from 'ng-zorro-antd';
import {Response} from '../../entity/Response';

@Component({
  selector: 'app-plugin-manager',
  templateUrl: './plugin-manager.component.html',
  styleUrls: ['./plugin-manager.component.css']
})
export class PluginManagerComponent implements OnInit {

  headerUp: HttpHeaders = new HttpHeaders({
    'Authorization': 'my-auth-token',
    'enctype': 'multipart/form-data'
  });

  page: Page;

  records: Array<any>;

  plugin: Plugin;

  customReq = (item: UploadXHRArgs) => {
    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('plugin', item.file as any);
    const req = new HttpRequest('POST', item.action, formData, {
      reportProgress: true,
      withCredentials: true,
      headers: this.headerUp
    });
    // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
    return this.client.request(req).subscribe((event: HttpEvent<{}>) => {
      if (event.type === HttpEventType.UploadProgress) {
        if (event.total > 0) {
          (event as any).percent = event.loaded / event.total * 100;
        }
        // 处理上传进度条，必须指定 `percent` 属性来表示进度
        item.onProgress(event, item.file);
      } else if (event instanceof HttpResponse) {
        // 处理成功
        item.onSuccess(event.body, item.file, event);
        let a: Response = event.body as Response;
        if (a.code != '-1') {
          alert(a.msg);
          this.getdata();
        } else {
          alert('上传插件失败');
        }
      }
    }, (err) => {
      // 处理失败
      item.onError(err, item.file);
      alert('上传插件失败');
    });
  };

  constructor(private getplugin: GetPluginService,
              private delservice: DelService, private client: HttpClient, private msg: NzMessageService) {
    // this.headerUp = new HttpHeaders({
    //   'Authorization': 'my-auth-token',
    //   'enctype': 'multipart/form-data'
    // });
  }

  ngOnInit() {
    this.page = new Page();
    this.getdata();
  }

  //上传文件
  // upload(files): any {
  //   this.plugin = null;
  //   const formData = new FormData();
  //   formData.append('opm', files.files[0]);
  //   return this.client.post<any>('/plugin/anaOpm', formData, {headers: this.headerUp}).toPromise().then((response) => {
  //     if (response.code === -1) {
  //       alert(response.msg);
  //     } else {
  //       alert('上传插件成功');
  //     }
  //   });
  // }

  /**
   *  跳转插件使用界面
   */
  toUsePluginPage(item): void {
    this.getplugin.plugins = item;
  }

  /**
   * 删除插件按钮
   */
  del(pluginId: string, index: string) {
    this.delservice.delPlugin(pluginId).subscribe(res => {
      if (res.code === 0 && confirm("确认删除？")) {
        alert('删除成功');
        this.getdata();
      } else {
        alert('删除失败');
      }
    }, err => {
      console.log(err);
    });
  }

  /**
   * 获取插件实体数据
   */
  getdata() {
    this.getplugin.getPlugin(this.page.currentPage, this.page.currtNum).subscribe(res => {
      // 获取数据
      this.records = res.rows;
      console.log(this.records);
    });
  }

  // 查询按钮
  select() {
    this.getdata();
  }
}

// export class Response {
//   code: number;
//   data: Plugin;
//   msg: string;
//
//   constructor(opts: {
//     code?: number,
//     data?: Plugin,
//     msg?: string
//   } = {}) {
//     this.code = opts.code;
//     this.data = opts.data;
//     this.msg = opts.msg;
//   }
// }

// /**
//  * 参数说明
//  */
// export class Parameters {
//
//   name: string;
//   description: string;
//   type: string;
//   tips: string;
//   value: string;
//
//   constructor(ops: {
//     description?: string,
//     name?: string,
//     type?: string,
//     tips?: string,
//     value?: string
//   } = {}) {
//     this.description = ops.description;
//     this.name = ops.name || '';
//     this.type = ops.type || '';
//     this.tips = ops.tips || '';
//     this.value = ops.value || '';
//   }
// }
