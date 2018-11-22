import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {Parameters} from '../../entity/Parameters';
import {Plugin} from '../../entity/plugin';
import {GetPluginService} from '../../service/getplugin/get-plugin.service';

@Component({
  selector: 'app-upload-plug',
  templateUrl: './upload-plug.component.html',
  styleUrls: ['./upload-plug.component.css']
})
export class UploadPlugComponent implements OnInit {

  headerUp: HttpHeaders;

  opmEntity: OpmEntitys = new OpmEntitys();

  plugin: Plugin = new Plugin();

  constructor(private client: HttpClient, private get: GetPluginService, private router: Router) {
    this.headerUp = new HttpHeaders({
      'Authorization': 'my-auth-token',
      'enctype': 'multipart/form-data'
    });
  }

  ngOnInit() {
    this.plugin = this.get.plugins;
  }

  // upload(files) {
  //   console.log(files);
  //   this.opmEntity = null;
  //   const formData = new FormData();
  //   // formData.append('opm', files.files[0]);
  //   formData.append('opm', files);
  //   return this.client.post<Response>('/anaOpm', formData, {headers: this.headerUp}).toPromise().then((response) => {
  //     console.log(response.code);
  //     if (response.code === -1) {
  //       alert(response.msg);
  //     } else {
  //       this.opmEntity = response.data;
  //     }
  //   });
  // }

  upload(files): any {
    this.opmEntity = null;
    const formData = new FormData();
    formData.append('opm', files.files[0]);
    return this.client.post<Response>('/plugin/anaOpm', formData, {headers: this.headerUp}).toPromise().then((response) => {
      if (response.code === -1) {
        alert(response.msg);
      } else {
        this.opmEntity = response.data;
      }
    });
  }

  changeParamterName(newValue, index): any {
    this.plugin.pluginParameterStr[index].value = newValue;
  }

  submit(): void {

    let regex3 = /\#{(.+?)\}/i;
    let sql: string = this.plugin.pluginBody;

    for (let i = 0; i < this.plugin.pluginParameterStr.length; i++) {
      sql = sql.replace(regex3, this.plugin.pluginParameterStr[i].value);
    }

    this.plugin.pluginBody = sql;

    if (this.plugin.pluginBack !== '') {
      let back: string = this.plugin.pluginBack;
      let regex4 = /\#{(.+?)\}/g;
      let p = this.plugin.pluginBack.match(regex4);
      if (p != null) {
        for (let j = 0; j < p.length; j++) {
          for (let i = 0; i < this.plugin.pluginParameterStr.length; i++) {
            if (p[j] === '#{' + this.plugin.pluginParameterStr[i].name + '}') {
              back = back.replace(regex3, this.plugin.pluginParameterStr[i].value);
            }
          }
        }
        this.plugin.pluginBack = back;
      }
    }

    this.client.post<any>('/plugin/run', this.plugin).toPromise().then((value) => {
      if (value.code === -1) {
        alert(value.msg);
        window.sessionStorage.removeItem('auto_token');
        this.router.navigate(['/signin']);
      }
    }).catch(reason => {
      console.log(reason);
    });

  }
}


export class Response {

  code: number;

  data: OpmEntitys;

  msg: string;

  constructor(opts: {
    code?: number,
    data?: OpmEntitys,
    msg?: string
  } = {}) {
    this.code = opts.code;
    this.data = opts.data;
    this.msg = opts.msg;
  }

}

/**
 * 参数说明
 */
// export class Parameters {
//
//   name: string;
//
//   description: string;
//
//   type: string;
//
//   tips: string;
//
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
//
//
// }

/**
 * 参数主题说明
 */
export class OpmEntitys {

  /**
   * 参数功能说明
   */
  description: string;
  /**
   * 插件主体
   */
  body: string;
  /**
   * 插件备份
   */
  back: string;
  /**
   * 插件参数{JSON格式}
   */
  params: Array<Parameters>;

  constructor(ops: {
    description?: string,
    body?: string,
    back?: string,
    params?: Array<Parameters>
  } = {}) {
    this.description = ops.description || '';
    this.body = ops.body || '';
    this.back = ops.back || '';
    this.params = ops.params || [];
  }

}
