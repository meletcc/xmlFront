import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-upload-plug',
  templateUrl: './upload-plug.component.html',
  styleUrls: ['./upload-plug.component.css']
})
export class UploadPlugComponent implements OnInit {

  headerUp: HttpHeaders;

  opmEntity: OpmEntitys;

  constructor(private client: HttpClient, private router: Router) {
    this.headerUp = new HttpHeaders({
      'Authorization': 'my-auth-token',
      'enctype': 'multipart/form-data'
    });
  }

  ngOnInit() {
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
    return this.client.post<Response>('/anaOpm', formData, {headers: this.headerUp}).toPromise().then((response) => {
      if (response.code === -1) {
        alert(response.msg);
      } else {
        this.opmEntity = response.data;
      }
    });
  }

  changeParamterName(newValue, index): any {
    this.opmEntity.params[index].value = newValue;
  }

  submit(): void {

    let regex3 = /\#{(.+?)\}/i;
    let sql: string = this.opmEntity.body;

    for (let i = 0; i < this.opmEntity.params.length; i++) {
      sql = sql.replace(regex3, this.opmEntity.params[i].value);
    }

    this.opmEntity.body = sql;

    if (this.opmEntity.back !== '') {
      let back: string = this.opmEntity.back;
      let regex4 = /\#{(.+?)\}/g;
      let p = this.opmEntity.back.match(regex4);
      if (p != null) {
        for (let j = 0; j < p.length; j++) {
          for (let i = 0; i < this.opmEntity.params.length; i++) {
            if (p[j] === '#{' + this.opmEntity.params[i].name + '}') {
              back = back.replace(regex3, this.opmEntity.params[i].value);
            }
          }
        }
        this.opmEntity.back = back;
      }
    }

    this.client.post<any>('/run', this.opmEntity).toPromise().then((value) => {
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
export class Parameters {

  name: string;

  description: string;

  type: string;

  tips: string;

  value: string;

  constructor(ops: {
    description?: string,
    name?: string,
    type?: string,
    tips?: string,
    value?: string
  } = {}) {
    this.description = ops.description;
    this.name = ops.name || '';
    this.type = ops.type || '';
    this.tips = ops.tips || '';
    this.value = ops.value || '';
  }


}

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
