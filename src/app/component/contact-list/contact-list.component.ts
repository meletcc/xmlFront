import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  //参数集合
  parameters: Array<Parameter> = [];

  // //是否备份，True:是，False:否
  // back: boolean = false;

  opmEntity: OpmEntity = new OpmEntity();

  isBackup: boolean = false;

  constructor(private http: HttpClient, private router: Router) {

  }

  ngOnInit() {

  }

  //获取sql
  acquireSql(): void {
    this.parameters = [];
    let regex3 = /\#{(.+?)\}/g;
    let results = this.opmEntity.body.match(regex3);
    results.forEach(value => {
      let parameter: Parameter = new Parameter();
      parameter.name = value.substring(2, value.length - 1);
      this.parameters.push(parameter);
    });

  }

  //取消或者保存备份
  backUp(): void {
    if (this.isBackup) {
      this.opmEntity.back = '';
      this.isBackup = false;
    } else {
      this.isBackup = true;
    }

  }

  //保存插件
  savePlugIn(): void {
    //to do service
    this.opmEntity.parameterStr = JSON.stringify(this.parameters);
    console.log(JSON.stringify(this.parameters));
    /* this.http.post<any>('/make', this.opmEntity).toPromise().then(
       ada =>{
         window.location.href = "192.168.5.208:3000/make"+ada;
         console.log(ada);
       }
     )}*/
    this.http.post('/make', this.opmEntity, {responseType: 'blob'}).subscribe(data => {
      const link = document.createElement('a');
      const blob = new Blob([data], {type: 'application/text'});
      link.setAttribute('href', window.URL.createObjectURL(blob));
      link.setAttribute('download', this.opmEntity.description + '.opm');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}

/**
 * 参数说明
 */
export class Parameter {

  name: string;

  description: string;

  type: string;

  tips: string;

  constructor(ops: {
    description?: string,
    name?: string,
    type?: string,
    tips?: string
  } = {}) {
    this.description = ops.description;
    this.name = ops.name;
    this.type = ops.type;
    this.tips = ops.tips;
  }

}

/**
 * 参数主题说明
 */
export class OpmEntity {

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
  parameterStr: string;

  constructor(ops: {
    description?: string,
    body?: string,
    back?: string,
    parameterStr?: string
  } = {}) {
    this.description = ops.description;
    this.body = ops.body;
    this.back = ops.back;
    this.parameterStr = ops.parameterStr;
  }

}
