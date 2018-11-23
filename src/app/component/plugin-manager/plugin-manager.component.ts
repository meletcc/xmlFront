import {Component, OnInit} from '@angular/core';
import {Page} from '../../entity/page';
import {GetPluginService} from '../../service/getplugin/get-plugin.service';
import {DelService} from '../../service/delService/del.service';

@Component({
  selector: 'app-plugin-manager',
  templateUrl: './plugin-manager.component.html',
  styleUrls: ['./plugin-manager.component.css']
})
export class PluginManagerComponent implements OnInit {

  page: Page;
  records: Array<any>;
  // headerUp: HttpHeaders;
  // plugin: Plugin;

  constructor(private getplugin: GetPluginService,
              private delservice: DelService) {
  }

  ngOnInit() {
    this.page = new Page();
    this.getdata();
  }

  // /**
  //  * 上传文件
  //  */
  // upload(files): any {
  //   this.plugin = null;
  //   const formData = new FormData();
  //   formData.append('opm', files.files[0]);
  //   return this.client.post<Response>('/anaOpm', formData, {headers: this.headerUp}).toPromise().then((response) => {
  //     if (response.code === -1) {
  //       alert(response.msg);
  //     } else {
  //       this.plugin = response.data;
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
      if (res.code === 0) {
        alert('删除成功');
      }
      else {
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
